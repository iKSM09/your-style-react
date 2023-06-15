import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import { firebaseApp } from ".";

export const userAuth = getAuth(firebaseApp);

export const createNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(
    userAuth,
    email,
    password
  );
  await updateProfile(user, {
    displayName: name,
  });

  console.log(userAuth);
  console.log(userAuth.currentUser);
};
