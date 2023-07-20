import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { Route } from "@tanstack/router";
import { sellerDashboardRoute } from "../dashboard/Dashboard.page";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { storage } from "../../utils/firebase/storage.firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import Categories from "../../components/categories/Categories.component";
import { createNewProductDoc } from "../../utils/firebase/db.firebase";
import useCurrentUser from "../../hooks/useAuthStateChange";
import { FormDataType } from "../../components/auth/Register.component";

export const Form = styled.form`
  margin: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  text-align: start;

  * {
    width: 100%;
    flex-basis: 1;
  }
`;

export const addProductRoute = new Route({
  getParentRoute: () => sellerDashboardRoute,
  path: "/addProduct",
});

export const addProductIndexRoute = new Route({
  getParentRoute: () => addProductRoute,
  path: "/",
  component: AddProduct,
});

const MAX_FILE_SIZE = 15000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const addProductSchema = z.object({
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
      // invalid_type_error: "Age must be a number.",
    })
    .int()
    .positive({ message: "Please select an positive number." }),
  sizes: z.string().nonempty("Sizes are required."),
  colors: z.array(
    z.object({
      name: z.string().nonempty(),
      images: z.any(),
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

export type AddProductTypes = z.infer<typeof addProductSchema>;

export const paths = [
  {
    category: "men",
    subCategory: [
      {
        name: "topwear",
        items: ["T-shirt", "Casual Shirt", "Formal Shirts", "Suits", "Jackets"],
      },
      {
        name: "bottomwear",
        items: [
          "Jeans",
          "Casual Trousers",
          "Formal Trousers",
          "Shorts",
          "Trackpants",
        ],
      },
      {
        name: "ethnicwear",
        items: ["Kurta Sets", "Kurta", "Sherwanis", "Dhoti Sets"],
      },
      {
        name: "footwear",
        items: [
          "Sport Shoes",
          "Sneakers",
          "Flipflops",
          "Casual Shoes",
          "Formal Shoes",
          "Ethinic Footwear",
          "Sandals",
        ],
      },
    ],
  },
  {
    category: "women",
    subCategory: [
      {
        name: "westernwear",
        items: [
          "Dresses",
          "Tops",
          "Bottom Pants and Trousers",
          "Jackets and Coats",
          "Shirts",
          "Skirts",
        ],
      },
      {
        name: "indianwear",
        items: [
          "Sarees",
          "Salwar Suits and Sets",
          "Kurtis Kurtas and Tunic",
          "Ethinic Dresses",
          "Lehengas",
        ],
      },
      {
        name: "footwear",
        items: [
          "Heels",
          "Flats",
          "Sandals",
          "Sneakers",
          "Sports Shoes",
          "Flipflops",
          "Casual Shoes",
        ],
      },
    ],
  },
];

export const getAllPaths = () => {
  const allPaths: string[] = [];
  // const myCategory = [];
  // const mySubCategory = [];
  // const myItems = [];

  paths.map((path) => {
    // myCategory.push(path.category);
    path.subCategory.map((subCat) => {
      // mySubCategory.push(subCat.name);
      subCat.items.map((item) =>
        // myItems.push(item.toLowerCase().split(" ").join("-"))
        allPaths.push(
          `${path.category}/${subCat.name}/${item
            .toLowerCase()
            .split(" ")
            .join("-")}`
        )
      );
    });
  });

  return allPaths;
};

const pathCollection = [];

export default function AddProduct() {
  const currentUser = useCurrentUser();
  const [images, setImages] = useState<{ [myKey: number]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [path, setPath] = useState<string[] | null>([]);

  const { register, control, setValue, handleSubmit, formState, reset } =
    useForm<AddProductTypes>({
      mode: "onBlur",
      defaultValues: {
        id: crypto.randomUUID(),
        postedBy: currentUser?.email,
        name: "",
        category: "",
        description: "",
        price: 0,
        sizes: "",
        colors: [
          {
            name: "",
            images: [],
          },
        ],
      },
      resolver: zodResolver(addProductSchema),
    });

  const { errors, isLoading, isSubmitting } = formState;

  const {
    fields: colorsFields,
    append,
    remove,
  } = useFieldArray({
    name: "colors",
    control,
  });

  const handleImagesAsFile = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setValue("postedBy", currentUser?.email);
    if (e.target.files == null) return;
    const imagesURL: string[] = [];
    const imgFiles: FileList = e.target.files;

    for (let i = 0; i < imgFiles.length; i++) {
      let file = imgFiles[i];

      let storagePath = `products/${file.lastModified + file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done!`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("File available at ", downloadUrl);
            imagesURL.push(downloadUrl);
          });
        }
      );
    }

    setImages({ ...images, [index]: imagesURL });
    return imagesURL;
  };

  const onSubmitSuccess = async (data: AddProductTypes) => {
    try {
      data.colors.map((color, index) => (color.images = images[index]));
      console.log("submitted!!", data);
      await createNewProductDoc(data);
      reset();
    } catch (error) {
      console.error("submit error:", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<AddProductTypes>) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Name of your product"
        />
        {errors.name && <small>{errors.name.message}</small>}
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="category">Product Category: </label>
          <small>{path?.join("/")}</small>
        </div>

        <div style={{ display: "flex" }}>
          <select
            name="main-category"
            id="main-category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {paths.map(({ category }) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select id="category" {...register("category")}>
            {paths
              .filter((path) => path.category === selectedCategory)
              .map(({ subCategory }) =>
                subCategory.map((list) => (
                  <optgroup key={list.name} label={list.name}>
                    {list.items.map((item) => (
                      <option
                        key={item.toLowerCase().split(" ").join("-")}
                        value={`${selectedCategory}/${list.name}/${item
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`}
                      >
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))
              )}
          </select>
        </div>
        {errors.category && <small>{errors.category.message}</small>}
      </div>

      <div>
        <label htmlFor="description">Produt Description</label>
        <textarea
          rows={5}
          {...register("description", { maxLength: 1000 })}
          placeholder="Describe your product..."
        />
        {errors.description && <small>{errors.description.message}</small>}
      </div>

      <div>
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price of your product"
        />
        {errors.price && <small>{errors.price.message}</small>}
      </div>

      <div>
        <label htmlFor="sizes">Sizes the Product is available in:</label>
        <input type="text" {...register("sizes")} placeholder="sizes" />
        {errors.sizes && <small>{errors.sizes.message}</small>}
      </div>

      <div>
        <label htmlFor="colors">Colors the Product is available in:</label>
        <div>
          {colorsFields.map((color, index) => {
            return (
              <div key={color.id} style={{ marginBottom: "12px" }}>
                <p>{`Color ${index + 1}`}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    key={`${color.id}-name`}
                    type="text"
                    {...register(`colors.${index}.name` as const)}
                    placeholder="Color Name"
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  )}
                </div>
                <input
                  key={`${color.id}-images`}
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  {...register(`colors.${index}.images` as const, {
                    onChange: (e) =>
                      setValue(
                        `colors.${index}.images`,
                        handleImagesAsFile(e, index)
                      ),
                  })}
                  placeholder="Select images"
                />
                {errors.colors && <small>{errors.colors.message}</small>}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                images: [],
              })
            }
          >
            Add new product varient
          </button>
        </div>
      </div>

      <button type="submit">Submit product</button>
    </Form>
  );
}
