import { useEffect, useState } from "react";
import { useParams } from "@tanstack/router";

import { MdShoppingBag } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

import productData from "../../data/data.json";

import {
  DetailsSection,
  Divider,
  Image,
  ImagesSection,
  ProductContainer,
  ProductSizeButton,
  ImageGallery,
  ImageContainer,
} from "./Product.styles";
import StarsRating from "../../components/stars-rating/StarsRating.component";
import { cartStore } from "../../context/cart.store";
import { ProductDataTypes, productsStore } from "../../context/products.store";
import { productIndexRoute } from "./Product.route";
import { UserPostTypes, postsStore } from "../../context/posts.store";
import { useAtom } from "jotai";
import { postModalAtom } from "../../context/atoms";
import UserPost from "../../components/user-post/UserPost.component";
import { Button, IconButton } from "../../components/_ui/button/Button.styles";

const Product = () => {
  const params = useParams({ from: productIndexRoute.id });
  const [modalState, setModalState] = useAtom(postModalAtom);
  const [selectedPost, setSelectedPost] = useState<UserPostTypes | null>(null!);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [toCart, setToCart] = useState(false);
  const [clothColor, setClothColor] = useState(
    {} as {
      images: string[];
      name: string;
    }
  );

  const [products, getAllProducts, filteredProduct] = productsStore((state) => [
    state.products,
    state.getAllProducts,
    state.filteredProduct,
  ]);

  const [allPosts, setPosts] = postsStore((state) => [
    state.allPosts,
    state.setPosts,
  ]);

  const [cartItems, addToCart] = cartStore((state) => [
    state.cartItems,
    state.addToCart,
  ]);

  const thisProduct = filteredProduct(params.productId);

  console.log({ products });
  console.log({ cartItems });
  console.log({ thisProduct });

  useEffect(() => {
    if (products.length === 0) getAllProducts();
    if (allPosts.length === 0) setPosts();
  }, [products.length]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [params, selectedColor]);

  useEffect(() => {
    if (products.length === 0) getAllProducts();
  }, [params.productId]);

  useEffect(() => {
    let cartItem = cartItems.filter((item) => item.id === thisProduct.id)[0];
    let selectedClothColor = thisProduct?.colors?.filter(
      (color) => color?.name === cartItem?.color
    )[0];

    setSelectedSize(
      cartItem === undefined
        ? thisProduct?.sizes?.split(", ")[0]
        : cartItem.size
    );
    setSelectedColor(
      cartItem === undefined ? thisProduct?.colors[0].name : cartItem.color
    );
    setClothColor(
      cartItem === undefined ? thisProduct?.colors[0] : selectedClothColor
    );
    setToCart(
      cartItems.filter((item) => item.id === thisProduct?.id).length === 1
    );
  }, [thisProduct, cartItems]);

  const handleChangeColor = (selectedColor: string) => {
    const filtered = thisProduct?.colors.filter(
      (color) => color.name === selectedColor
    )[0];

    setClothColor(filtered);
    setSelectedColor(selectedColor);
  };

  const handleAddToCart = (thisProduct: ProductDataTypes) => {
    const selectedImage = thisProduct?.colors.filter(
      (color) => color.name === selectedColor
    )[0].images[0];

    addToCart({
      id: thisProduct.id,
      category: thisProduct.category,
      name: thisProduct.name,
      postedBy: thisProduct.postedBy,
      color: selectedColor,
      image: selectedImage,
      size: selectedSize,
      price: thisProduct.price,
      quantity: 1,
      totalPrice: thisProduct?.price,
    });
    setToCart(true);
  };

  const handleShowPost = (userPost: UserPostTypes) => {
    setModalState((bool) => !bool);
    setSelectedPost(userPost);
  };

  return (
    <div style={{ textAlign: "start" }}>
      <p
        style={{ padding: "2rem 1rem 0.5rem" }}
      >{`${thisProduct?.category}/${thisProduct?.name}`}</p>
      <ProductContainer>
        <ImagesSection>
          {clothColor?.images?.map((img, idx) => (
            <Image key={idx} src={img} alt={`${idx}`} />
          ))}
        </ImagesSection>
        <DetailsSection>
          <h2>{thisProduct?.category?.toUpperCase().split("/")[2]}</h2>
          <h1>{thisProduct?.name}</h1>
          <small>By {thisProduct?.postedBy}</small>
          <p>{thisProduct?.description}</p>
          <div
            style={{
              marginBlock: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <StarsRating ratingStars={productData.rating.stars} />
              <p>|</p>
              <p style={{ margin: "0" }}>
                {productData.rating.numbers} Ratings
              </p>
            </div>
            <p>{productData.rating.reviews} Reviews</p>
          </div>
          <Divider />
          <div
            style={{
              marginBlock: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <p style={{ margin: "0", fontWeight: "bold", fontSize: "24px" }}>
              ₹{productData.discounted_price}
            </p>
            <p
              style={{
                margin: "0",
                textDecoration: "line-through",
                color: "#7e7e7e",
              }}
            >
              MRP ₹{thisProduct?.price}
            </p>
            <small style={{ margin: "0", color: "#0cc258" }}>
              ({productData.discount})
            </small>
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>SELECT SIZE:</p>
            <div
              style={{
                marginBlock: "16px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {thisProduct?.sizes
                ?.toUpperCase()
                .split(", ")
                .map((size: string) =>
                  size === selectedSize ? (
                    <ProductSizeButton $selected={true} key={size}>
                      {size}
                    </ProductSizeButton>
                  ) : (
                    <ProductSizeButton
                      $selected={false}
                      key={size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </ProductSizeButton>
                  )
                )}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>COLOR:</p>
            <div
              style={{
                marginBlock: "12px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: "12px",
              }}
            >
              {thisProduct?.colors?.map(({ name, images }) => (
                <Image
                  title={name}
                  key={name}
                  onClick={() => handleChangeColor(name)}
                  src={images[0]}
                  alt={name}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              marginBlock: "16px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {toCart ? (
              <Button $secondary>Added to Cart</Button>
            ) : (
              <IconButton
                $curved
                style={{ maxWidth: "100%" }}
                onClick={() => handleAddToCart(thisProduct!)}
              >
                <MdShoppingBag /> ADD TO CART
              </IconButton>
            )}
            <IconButton
              $secondary
              $outlined
              $curved
              style={{ maxWidth: "100%" }}
            >
              <IoMdHeartEmpty /> WISHLIST
            </IconButton>
          </div>
        </DetailsSection>
      </ProductContainer>
      <Divider />
      <h3 style={{ marginInline: "16px" }}>Posts by users</h3>
      {modalState && <UserPost post={selectedPost!} closeOnOutsideClick />}
      <ImageGallery>
        {allPosts
          .filter(
            (post) => post.productLink.split("/").pop() === params.productId
          )
          .map((post) => (
            <ImageContainer key={post.id}>
              <img
                src={post.image}
                alt={`a photo by ${post.postedBy}`}
                onClick={() => handleShowPost(post)}
              />
            </ImageContainer>
          ))}
      </ImageGallery>
    </div>
  );
};

export default Product;
