import { Route } from "@tanstack/router";
import { userRoute } from "../user/user-route";
import { ChangeEvent, useState } from "react";
import useCurrentUser from "../../hooks/useAuthStateChange";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase/storage.firebase";

export const addPostRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/add-post",
});

export const addPostIndexRoute = new Route({
  getParentRoute: () => addPostRoute,
  path: "/",
  component: AddUserPost,
});

function AddUserPost() {
  const user = useCurrentUser();
  const [images, setImages] = useState<string[]>([]);

  const handleImagesAsFile = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files == null) return;
    const imagesURL: string[] = [];
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
            imagesURL.push(downloadUrl);
            setImages(imagesURL);
          });
        }
      );
    }
  };

  console.log({ images }, images.length);
  console.log("0:", images[0]);
  console.log("1:", images[1]);

  return (
    <div>
      <h2>Add New Post (WIP)</h2>
      <ul>
        <li>
          <div>
            <input
              name="post"
              id="post"
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => handleImagesAsFile(e)}
            />
            <div>
              {images?.map((image, index) => (
                <img
                  key={index}
                  width={120}
                  src={image}
                  alt={`preview image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </li>
        <li>
          <textarea
            name="caption"
            id="caption"
            cols={32}
            rows={0o5}
            placeholder="write your cation..."
          ></textarea>
        </li>
        <li>Product Reference</li>
        <li>Post</li>
      </ul>
    </div>
  );
}

export default AddUserPost;
