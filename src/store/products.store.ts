import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase/db.firebase";

export type ProductDataTypes = {
  category: string;
  colors: {
    images: string[];
    name: string;
  }[];
  description: string;
  id: string;
  name: string;
  postedBy: string;
  price: number;
  sizes: string;
};

type State = {
  products: ProductDataTypes[];
  productsByCategory: ProductDataTypes[];
  productsBySubCategory: ProductDataTypes[];
  selectedProduct: ProductDataTypes;
};

type Action = {
  setProducts: (/* allProducts: State["products"] */) => void;
  filterProductsByCategrory: (category: string) => void;
  filterProductsBySubCategory: (subCategory: string) => void;
  filterSelectedProduct: (id: string) => void;
};

type PersistTypes = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>;

const getAllProducts = async () => {
  const collectionRef = collection(db, "products");
  const collectionQuery = query(collectionRef);
  const collectionSnapshot = await getDocs(collectionQuery);

  return collectionSnapshot.docs.map((doc) => doc.data());
};

export const productsStore = create<State & Action>(
  (persist as PersistTypes)(
    (set) => ({
      products: [],
      productsByCategory: [],
      productsBySubCategory: [],
      selectedProduct: {} as ProductDataTypes,

      setProducts: async (/* allProducts */) =>
        set({ products: (await getAllProducts()) as ProductDataTypes[] }),
      filterProductsByCategrory: (category) =>
        set(({ products, setProducts }) => {
          if (products.length === 0) setProducts();

          return {
            productsByCategory: products.filter(
              (product) => product.category.split("/")[0] === category
            ),
          };
        }),
      filterProductsBySubCategory: (subCategory) =>
        set(({ products, setProducts }) => {
          if (products.length === 0) setProducts();

          return {
            productsBySubCategory: products.filter(
              (product) => product.category.split("/")[1] === subCategory
            ),
          };
        }),
      filterSelectedProduct: (id) =>
        set(({ products, setProducts }) => {
          if (products.length === 0) setProducts();

          const filteredProduct = products.filter(
            (product) => product.id === id
          )[0];

          return {
            selectedProduct: { ...filteredProduct },
          };
        }),
    }),
    {
      name: "product-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
