import { ChangeEvent, useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useAuthStateChange";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase/storage.firebase";
import { MdAddCircleOutline } from "react-icons/md";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUserPostDoc } from "../../utils/firebase/db.firebase";
import { UserPostTypes, userPostSchema } from "../../context/posts.store";
import AuthState from "../../components/auth/AuthState.component";

const AddUserPost = () => {
  const user = useCurrentUser();
  const [imageURL, setImageURL] = useState("");
  const [newUser, setNewUser] = useState(false);

  const isNewUser = () => setNewUser((bool) => !bool);

  const { register, trigger, handleSubmit, formState, setValue, reset } =
    useForm<UserPostTypes>({
      mode: "onBlur",
      defaultValues: {
        id: crypto.randomUUID(),
        postedBy: user?.email,
        postDate: new Date(),
        image: "",
        caption: "",
        productLink: "",
      },
      resolver: zodResolver(userPostSchema),
    });

  const { errors, isLoading, isSubmitting } = formState;

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const handleImagesAsFile = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("postedBy", user?.email);

    if (e.target.files == null) return;
    const imgFiles: FileList = e.target.files!;

    for (let i = 0; i < imgFiles.length; i++) {
      let file = imgFiles[i];

      let storagePath = `posts/${user?.email}/${file.lastModified}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done!`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("File available at ", downloadUrl);
            setImageURL(downloadUrl);
            setValue("image", downloadUrl);
          });
        }
      );
    }
  };

  const onSubmitSuccess = async (data: UserPostTypes) => {
    try {
      await createNewUserPostDoc(data);
      console.log("submitted!!", data);
      setImageURL("");
      reset();
    } catch (error) {
      console.error("submit error:", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<UserPostTypes>) => {
    console.error("submit failed errors:", errors);
  };

  return (
    <>
      {user ? (
        <form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
          <h2>Add New Post</h2>

          <div>
            <div
              onClick={() => trigger("image")}
              style={{
                marginInline: "auto",
                width: "320px",
                backgroundColor: "var(--secondary)",
                border: "solid 1px #fff",
                borderRadius: "4px",
                aspectRatio: "2 / 3",
                overflow: "hidden",
              }}
            >
              <input
                hidden
                id="user-post"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                {...register("image", {
                  onChange: (e) => handleImagesAsFile(e),
                })}
              />
              {imageURL === "" ? (
                <span
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "var(--primary)",
                  }}
                >
                  <MdAddCircleOutline size={40} />
                  <label
                    htmlFor="user-post"
                    style={{ fontWeight: "500", margin: "12px" }}
                  >
                    Add an Image...
                  </label>
                </span>
              ) : (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={imageURL}
                  alt={`preview image`}
                />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="caption">Caption</label>
            <textarea
              cols={32}
              rows={0o5}
              {...register("caption")}
              placeholder="write your cation..."
            ></textarea>
          </div>

          <div>
            <label htmlFor="product-link">Product Reference</label>
            <input
              type="text"
              {...register("productLink")}
              placeholder="link to the product you use"
            />
          </div>

          <button type="submit">Post</button>
        </form>
      ) : (
        <AuthState />
      )}
    </>
  );
};

export default AddUserPost;
