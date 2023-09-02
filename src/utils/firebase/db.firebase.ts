import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { firebaseApp } from ".";
import { UserPostTypes } from "../../context/posts.store";
import { ProductDataTypes } from "../../context/products.store";
import { UserSchemaType } from "../../context/atoms";
import { auth, updateUserProfile } from "./auth.firebase";

export const db = getFirestore(firebaseApp);
const path = "users";

// Get all Collection Docs
export const getCollectionDocsFor = async (collectionID: string) => {
  const collectionRef = collection(db, collectionID);
  const collectionQuery = query(collectionRef);
  const collectionSnapshot = await getDocs(collectionQuery);

  return collectionSnapshot.docs.map((doc) => doc.data());
};

// Get User Data from db
export const getUserData = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

// Creating User collection in FireStore
export const createNewUserDoc = async (user: User, vendor: boolean) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user doc doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    const isVendor = vendor;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        isVendor,
      });
    } catch (error) {
      if (error instanceof Error)
        console.error(`error creating the user: ${error.message}`);
      else console.error("Unexpected error", error);
    }
  }
};

// Edit User collection in FireStore
export const editUserDoc = async (fieldsToUpdate: Partial<UserSchemaType>) => {
  const user = auth.currentUser;

  if (!user) return;
  const userDocRef = doc(db, path, user.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user doc exist
  if (userSnapshot.exists()) {
    try {
      await updateDoc(userDocRef, fieldsToUpdate);

      if (fieldsToUpdate.displayName || fieldsToUpdate.photoURL) {
        await updateUserProfile(
          fieldsToUpdate.displayName,
          fieldsToUpdate.photoURL
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// Creating User Post collection in FireStore
export const createNewUserPostDoc = async (post: UserPostTypes) => {
  if (!post) return;

  const path = "posts";

  const postDocRef = doc(db, path, post.id);
  const postSnapshot = await getDoc(postDocRef);

  // if post doc doesn't exist
  if (!postSnapshot.exists()) {
    try {
      await setDoc(postDocRef, post);
    } catch (error) {
      console.error(error);
    }
  }
};
