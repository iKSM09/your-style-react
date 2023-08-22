import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { storage } from "../../utils/firebase/storage.firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createNewProductDoc } from "../../utils/firebase/db.products.firebase";
import useCurrentUser from "../../hooks/useAuthStateChange";
import {
  ProductDataTypes,
  productDataSchema,
} from "../../store/products.store";
import Form from "../../components/_ui/form/Form.component";
import Input from "../../components/_ui/form/Input.component";
import { Button } from "../../components/_ui/button/Button.styles";
import Select from "../../components/_ui/form/Select.component";
import Icon from "../../components/_ui/button/Icon.components";

export const Form2 = styled.form`
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

export const CatagorySelect = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  justify-items: center;
`;

export const VariantGroup = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  row-gap: 1rem;

  .center {
    margin: auto;
  }
`;

export const Variant = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
  gap: 1rem;

  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 2/3;
    border-radius: var(--border-curved);
  }

  .flexCol {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .flexbox {
    display: flex;
    align-items: end;
    gap: 0.5rem;
  }
`;

export const newPaths = {
  men: {
    topwear: ["T-shirt", "Casual Shirt", "Formal Shirts", "Suits", "Jackets"],
    bottomwear: [
      "Jeans",
      "Casual Trousers",
      "Formal Trousers",
      "Shorts",
      "Trackpants",
    ],
    ethnicwear: ["Kurta Sets", "Kurta", "Sherwanis", "Dhoti Sets"],
    footwear: [
      "Sport Shoes",
      "Sneakers",
      "Flipflops",
      "Casual Shoes",
      "Formal Shoes",
      "Ethinic Footwear",
      "Sandals",
    ],
  },
  women: {
    westernwear: [
      "Dresses",
      "Tops",
      "Bottom Pants and Trousers",
      "Jackets and Coats",
      "Shirts",
      "Skirts",
    ],
    indianwear: [
      "Sarees",
      "Salwar Suits and Sets",
      "Kurtis Kurtas and Tunic",
      "Ethinic Dresses",
      "Lehengas",
    ],
    footwear: [
      "Heels",
      "Flats",
      "Sandals",
      "Sneakers",
      "Sports Shoes",
      "Flipflops",
      "Casual Shoes",
    ],
  },
};

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

const AddProduct = () => {
  const currentUser = useCurrentUser();
  const [images, setImages] = useState<{ [myKey: number]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    { name: string; items: string[] }[]
  >([]);
  const [path, setPath] = useState<string[] | null>([]);

  const { register, control, setValue, handleSubmit, formState, reset } =
    useForm<ProductDataTypes>({
      mode: "onBlur",
      defaultValues: {
        id: crypto.randomUUID(),
        postedBy: currentUser?.email,
        name: "",
        category: "",
        subCategory: "",
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
      resolver: zodResolver(productDataSchema),
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

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    setSelectedSubCategory(
      paths.filter((path) => path.category === selectedCategory)[0].subCategory
    );
  }, [selectedCategory]);

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

  const onSubmitSuccess = async (data: ProductDataTypes) => {
    try {
      data.colors.map((color, index) => (color.images = images[index]));
      console.log("submitted!!", data);
      await createNewProductDoc(data);
      reset();
    } catch (error) {
      console.error("submit error:", error);
    }
  };

  const onSubmitError = (errors: FieldErrors<ProductDataTypes>) => {
    console.error("submit failed errors:", errors);
  };

  return (
    <Form
      formTitle="Add New Product"
      onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
    >
      <Input
        label="Product Name:"
        key="name"
        type="text"
        fieldName="name"
        formRegister={register("name")}
        error={errors.name}
        placeholder="Name of your product"
      />

      <CatagorySelect>
        <Select
          label="Category"
          fieldName="category"
          selectRegister={register("category", {
            onChange: (e) =>
              setSelectedCategory((e.target as HTMLSelectElement).value),
            value: selectedCategory,
          })}
          error={errors.category}
        >
          {paths.map(({ category }) => (
            <Select.Option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Select.Option>
          ))}
        </Select>
        <Select
          label="Sub-category"
          fieldName="subCategory"
          selectRegister={register("subCategory", {})}
          error={errors.subCategory}
        >
          {selectedSubCategory.map((list) => (
            <Select.OptGroup key={list.name} label={list.name}>
              {list.items.map((item) => (
                <Select.Option
                  key={item.toLowerCase().split(" ").join("-")}
                  value={`${selectedCategory}/${list.name}/${item
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                >
                  {item}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
      </CatagorySelect>

      <Input
        label="Product Description:"
        key="description"
        type="textarea"
        fieldName="description"
        formRegister={register("description", { maxLength: 1000 })}
        error={errors.description}
        placeholder="Describe your product..."
      />

      <Input
        label="Product Price:"
        key="price"
        type="number"
        fieldName="price"
        formRegister={register("price", { valueAsNumber: true })}
        error={errors.price}
        placeholder="Price your product"
      />

      <Input
        label="Sizes the Product is available in:"
        key="sizes"
        type="text"
        fieldName="sizes"
        formRegister={register("sizes")}
        error={errors.sizes}
        placeholder="Available sizes..."
      />

      <VariantGroup>
        <label htmlFor="product-variants">Product Variants:</label>

        {colorsFields.map((color, index) => (
          <Variant key={`${index}-${color}`}>
            <img
              src="https://maketuwetlands.org.nz/wp-content/uploads/2018/09/placeholder_portrait-1.jpg"
              alt={`preview image`}
            />
            <div className="flexCol">
              <div className="flexbox">
                <Input
                  label={`Product Variant ${index + 1}:`}
                  key={`${color.id}-name`}
                  type="text"
                  fieldName="price"
                  formRegister={register(`colors.${index}.name` as const)}
                  error={errors?.colors?.[index]?.name}
                  placeholder={`Variant ${index + 1} name`}
                />

                {index > 0 && (
                  <Icon.Delete
                    $secondary
                    $ghosted
                    $curved
                    type="button"
                    onClick={() => remove(index)}
                  />
                )}
              </div>

              <Input
                label="Upload images:"
                key={`${color.id}-images`}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                fieldName="sizes"
                formRegister={register(`colors.${index}.images` as const, {
                  onChange: (e) =>
                    setValue(
                      `colors.${index}.images`,
                      handleImagesAsFile(e, index)!
                    ),
                })}
                error={errors?.colors?.[index]?.images}
                placeholder="Select images"
              />
            </div>
          </Variant>
        ))}
        <div className="center">
          <Button
            $secondary
            $outlined
            $curved
            type="button"
            onClick={() =>
              append({
                name: "",
                images: [],
              })
            }
          >
            Add New Variant
          </Button>
        </div>
      </VariantGroup>

      <Button type="submit" $curved>
        Submit product
      </Button>
    </Form>
  );
};

export default AddProduct;
