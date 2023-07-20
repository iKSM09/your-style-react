import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { getUserData } from "../utils/firebase/db.firebase";

const useUserQuery = (user: User) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserData(user),
  });
};

export default useUserQuery;
