import React, { ChangeEvent, useEffect, useState } from "react";
import Dialog from "../dialog/Dialog.component";
import { styled } from "styled-components";
import { Button } from "../_ui/button/Button.styles";
import { FieldErrors, useForm } from "react-hook-form";
import Input from "../_ui/form/Input.component";
import Form from "../_ui/form/Form.component";
import useCurrentUser from "../../hooks/useAuthStateChange";
import { EditProfileType } from "../../context/atoms";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase/storage.firebase";
import { MdAddCircleOutline } from "react-icons/md";
import UserPlaceholderImage from "../../assets/user-placeholder-image.jpg";
import { editUserDoc } from "../../utils/firebase/db.firebase";

export const EditProfileContainer = styled.section``;

export const ProfilePicture = styled.div`
  position: relative;
  width: 120px;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }

  div.icon {
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--on-tertiary-container);
    background-color: var(--tertiary-container);
    border-radius: 50%;

    position: absolute;
    right: 0;
    bottom: 0;

    &:hover,
    &:active,
    &:focus {
      padding: 2px;
      color: var(--on-tertiary);
      background-color: var(--tertiary);
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

type EditProfileTypes = {
  dialogState: boolean;
  closeModal: () => void;
};

const EditProfileDialog = ({ dialogState, closeModal }: EditProfileTypes) => {
  const user = useCurrentUser();
  const [avatar, setAvatar] = useState("");

  console.log({ user });

  const { register, trigger, handleSubmit, formState, setValue, reset } =
    useForm<EditProfileType>({
      mode: "onBlur",
      defaultValues: {
        displayName: "",
        username: "",
        photoURL: "",
        bio: "",
      },
    });

  const { errors, isDirty, isSubmitting } = formState;

  useEffect(() => {
    setValue("displayName", user?.displayName);
    setValue("username", user?.email);
    setValue("bio", user?.bio);
    setValue("photoURL", user?.photoURL);
  }, []);

  useEffect(() => {
    setValue("photoURL", avatar);
    console.log("photoURL:", avatar);
  }, [avatar]);

  const handleImagesAsFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;

    let imageURL: string;
    const file: File = e.target.files[0];
    console.log("avatar:", file);

    let storagePath = `users/${user?.email}`;
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setAvatar(downloadUrl)
        );
      }
    );
  };

  const onSubmitSuccess = async (data: EditProfileType) => {
    data.photoURL = avatar;
    console.log({ data });
    await editUserDoc(data);
  };

  const onSubmitError = (errors: FieldErrors<EditProfileType>) => {
    console.error(errors);
  };

  return (
    <Dialog
      modalState={dialogState}
      closeModal={closeModal}
      closeOnOutsideClick
    >
      <EditProfileContainer>
        <Form
          formTitle="Edit Profile"
          onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
        >
          <ProfilePicture>
            <img
              src={avatar == "" ? UserPlaceholderImage : avatar}
              alt={`${user?.displayName} profile picture`}
              onClick={() => trigger("photoURL")}
            />
            <div className="icon" onClick={() => trigger("photoURL")}>
              <MdAddCircleOutline size={40} />
            </div>
          </ProfilePicture>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            {...register("photoURL", {
              onChange: (e) => handleImagesAsFile(e),
            })}
          />

          <Input
            label="Name:"
            type="text"
            fieldName="name"
            formRegister={register("displayName")}
            placeholder="Name"
            error={errors.displayName}
          />

          <Input
            label="Username:"
            type="text"
            fieldName="username"
            formRegister={register("username")}
            placeholder="Username"
            error={errors.username}
          />

          <Input
            label="Bio:"
            type="textarea"
            fieldName="bio"
            formRegister={register("bio")}
            placeholder="Bio for your profile"
            error={errors.bio}
          />

          <Button type="submit" $outlined $curved>
            Save Changes
          </Button>
        </Form>
      </EditProfileContainer>
    </Dialog>
  );
};

export default EditProfileDialog;
