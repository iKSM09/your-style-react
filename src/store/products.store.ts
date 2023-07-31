import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import { getCollectionDocsFor } from "../utils/firebase/db.firebase";
import { z } from "zod";

const MAX_FILE_SIZE = 15000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productDataSchema = z.object({
  id: z.string().uuid().nonempty("ID is required."),
  postedBy: z
    .string()
    .nonempty("Email is required")
    .email("Not a valid Email id."),
  name: z.string().nonempty("Name is required."),
  category: z
    .string()
    .nonempty(
      "Category is required. It helps people to discover your product easily."
    ),
  description: z
    .string()
    .nonempty("Description is required.")
    .max(1000, "Description should be lesser than 1000 words."),
  price: z
    .number({
      required_error: "Price is required.",
    })
    .int()
    .positive({ message: "Please select an positive number." }),
  sizes: z.string().nonempty("Sizes are required."),
  colors: z.array(
    z.object({
      name: z.string().nonempty(),
      images: z.string().array(),
      // .refine(
      //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      //   "Max image size is 5MB."
      // )
      // .refine(
      //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      //   "Only .jpg, .jpeg, .png and .webp formats are supported."
      // ),
    })
  ),
});

export type ProductDataTypes = z.infer<typeof productDataSchema>;

type State = {
  products: ProductDataTypes[];
  productsByCategory: ProductDataTypes[];
  productsBySubCategory: ProductDataTypes[];
  selectedProduct: ProductDataTypes;
  productFilters: string[];
};

type Action = {
  setProducts: () => void;
  filterProductsByCategrory: (category: string) => void;
  filterProductsBySubCategory: (subCategory: string) => void;
  // filterProductsByFilter: (filters: { [key: string]: boolean }) => void;
  filterSelectedProduct: (id: string) => void;
  setProductFilters: (filters: string[]) => void;
};

type PersistTypes = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>;

export const productsStore = create<State & Action>(
  (persist as PersistTypes)(
    (set) => ({
      products: [],
      productsByCategory: [],
      productsBySubCategory: [],
      selectedProduct: {} as ProductDataTypes,
      productFilters: [],

      setProducts: async () =>
        set({
          products: (await getCollectionDocsFor(
            "products"
          )) as ProductDataTypes[],
        }),
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
      // filterProductsByFilter: (filters) => set(state => {

      // }),
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
      setProductFilters: (filters) =>
        set({
          productFilters: filters,
        }),
    }),
    {
      name: "product-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
