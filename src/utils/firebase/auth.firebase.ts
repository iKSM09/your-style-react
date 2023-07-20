import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import { firebaseApp } from ".";
import { createNewUserDoc } from "./db.firebase";

export const auth = getAuth(firebaseApp);

// Auth State Listner
export const onAuthStateChangedListner = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// Sign Out
export const userSignOut = () => signOut(auth);

// Register
export const userRegister = async (
  name: string,
  email: string,
  password: string,
  isVendor: boolean
) => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName: name,
  });
  await createNewUserDoc(user, isVendor);

  return user;
};

// Sign In
export const userSignIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

// Googel Sign In
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const googleUserSignIn = () => signInWithPopup(auth, googleProvider);
