import { useEffect } from "react";
import { User } from "firebase/auth";
import { useAtom } from "jotai";

import { onAuthStateChangedListner } from "../utils/firebase/auth.firebase";
import { getUserData } from "../utils/firebase/db.firebase";
import { userAtom } from "../store/atoms";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner(async (user) => {
      if (user) {
        const userData = await getUserData(user);
        if (userData) setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return currentUser;
};

export default useCurrentUser;
