import { useQuery } from "@tanstack/react-query";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase/db.firebase";

const useProductsQuery = (filterBy: string = "products") => {
  const [values] = useCollectionData(collection(db, "products"));

  if (filterBy) {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => values,
      refetchInterval: 0,
    });
  } else if (
    filterBy === "men" ||
    filterBy === "women" ||
    filterBy === "kids"
  ) {
    let filterByCategrory = values?.filter(
      (product) => product.category.split("/")[0] === filterBy
    );
    return useQuery({
      queryKey: ["products", filterBy],
      queryFn: () => filterByCategrory,
      refetchInterval: 0,
    });
  } else {
    let filterBySubCategory = values?.filter(
      (product) => product.category.split("/")[1] === filterBy
    );
    return useQuery({
      queryKey: ["products", filterBy],
      queryFn: () => filterBySubCategory,
      refetchInterval: 0,
    });
  }
};

export default useProductsQuery;
