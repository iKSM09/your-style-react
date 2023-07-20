import { getStorage } from "firebase/storage";
import { firebaseApp } from ".";

export const storage = getStorage(firebaseApp);
