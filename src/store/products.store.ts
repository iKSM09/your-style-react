import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import { getCollectionDocsFor } from "../utils/firebase/db.firebase";
import { z } from "zod";
import {
  createNewProductDoc,
  deleteProductDoc,
  editProductDoc,
} from "../utils/firebase/db.products.firebase";

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
  subCategory: z
    .string()
    .nonempty(
      "sub-category is required. It helps people to discover your product easily."
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

type StateAction = {
  products: ProductDataTypes[];

  getAllProducts: () => void;
};

type State = {
  products: ProductDataTypes[];
  productsByCategory: ProductDataTypes[];
  productsBySubCategory: ProductDataTypes[];
  selectedProduct: ProductDataTypes;
  productFilters: string[];
};

type Action = {
  getAllProducts: () => void;
  addNewProduct: (
    data: ProductDataTypes,
    images: { [myKey: number]: string[] }
  ) => void;
  editProduct: (id: string, fieldsToUpdate: Partial<ProductDataTypes>) => void;
  deleteProduct: (id: string) => void;
  filterSelectedProduct: (id: string) => void;
  filterProductsByCategrory: (category: string) => void;
  filterProductsBySubCategory: (subCategory: string) => void;
  // filterProducts: (filters: { [key: string]: boolean }) => void;
  setProductFilters: (filters: string[]) => void;
};

type PersistTypes = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>;

export const productsStore = create<State & Action>(
  (persist as PersistTypes)(
    (set, get) => ({
      products: [],
      productsByCategory: [],
      productsBySubCategory: [],
      selectedProduct: {} as ProductDataTypes,
      productFilters: [],

      getAllProducts: async () =>
        set({
          products: (await getCollectionDocsFor(
            "products"
          )) as ProductDataTypes[],
        }),
      addNewProduct: async (data, images) => {
        try {
          data.colors.map((color, index) => (color.images = images[index]));
          console.log("submitted!!", data);
          await createNewProductDoc(data);
        } catch (error) {
          console.error("addNewProduct:", error);
        }
      },
      editProduct: async (id, fieldsToUpdate) => {
        try {
          await editProductDoc(id, fieldsToUpdate);
        } catch (error) {
          console.error("editProduct:", error);
        }
      },
      deleteProduct: async (id) => {
        try {
          await deleteProductDoc(id);
        } catch (error) {
          console.error("deleteProduct:", error);
        }
      },
      filterProductsByCategrory: (category) => {
        if (get().products.length === 0) get().getAllProducts();

        set(({ products }) => ({
          productsByCategory: products.filter(
            (product) => product.category.split("/")[0] === category
          ),
        }));
      },
      filterProductsBySubCategory: (subCategory) => {
        if (get().products.length === 0) get().getAllProducts();

        set(({ products }) => ({
          productsBySubCategory: products.filter(
            (product) => product.category.split("/")[1] === subCategory
          ),
        }));
      },
      filterSelectedProduct: (id) => {
        if (get().products.length === 0) get().getAllProducts();

        set(({ products }) => {
          const filteredProduct = products.filter(
            (product) => product.id === id
          )[0];

          return {
            selectedProduct: { ...filteredProduct },
          };
        });
      },
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
