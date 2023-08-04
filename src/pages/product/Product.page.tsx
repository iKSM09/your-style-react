import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/router";

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
} from "./Product.styles";
import { Button } from "../../components/button/Button.styles";
import StarsRating from "../../components/stars-rating/StarsRating.component";
import { cartStore } from "../../store/cart.store";
import { ProductDataTypes, productsStore } from "../../store/products.store";
import { productIndexRoute } from "./Product.route";

const Product = () => {
  const params = useParams({ from: productIndexRoute.id });
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [toCart, setToCart] = useState(false);
  const [clothColor, setClothColor] = useState(
    {} as {
      images: string[];
      name: string;
    }
  );

  const [product, setProducts, filterSelectedProduct] = productsStore(
    (state) => [
      state.selectedProduct,
      state.setProducts,
      state.filterSelectedProduct,
    ]
  );

  const [cartItems, addToCart] = cartStore((state) => [
    state.cartItems,
    state.addToCart,
  ]);

  useEffect(() => {
    setProducts();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [params, selectedColor]);

  useEffect(() => {
    setProducts();
    filterSelectedProduct(params.productId);
  }, [params.productId]);

  useEffect(() => {
    let cartItem = cartItems.filter((item) => item.id === product.id)[0];
    let selectedClothColor = product?.colors?.filter(
      (color) => color?.name === cartItem?.color
    )[0];

    setSelectedSize(
      cartItem === undefined ? product?.sizes.split(", ")[0] : cartItem.size
    );
    setSelectedColor(
      cartItem === undefined ? product?.colors[0].name : cartItem.color
    );
    setClothColor(
      cartItem === undefined ? product?.colors[0] : selectedClothColor
    );
    setToCart(cartItems.filter((item) => item.id === product?.id).length === 1);
  }, [product, cartItems]);

  const handleChangeColor = (selectedColor: string) => {
    const filtered = product?.colors.filter(
      (color) => color.name === selectedColor
    )[0];

    setClothColor(filtered);
    setSelectedColor(selectedColor);
  };

  const handleAddToCart = (product: ProductDataTypes) => {
    const selectedImage = product?.colors.filter(
      (color) => color.name === selectedColor
    )[0].images[0];

    addToCart({
      id: product.id,
      category: product.category,
      name: product.name,
      postedBy: product.postedBy,
      color: selectedColor,
      image: selectedImage,
      size: selectedSize,
      price: product.price,
      quantity: 1,
      totalPrice: product?.price,
    });
    setToCart(true);
  };

  return (
    <div style={{ textAlign: "start" }}>
      <p
        style={{ padding: "2rem 1rem 0.5rem" }}
      >{`${product?.category}/${product?.name}`}</p>
      <ProductContainer>
        <ImagesSection>
          {clothColor?.images?.map((img, idx) => (
            <Image key={idx} src={img} alt={`${idx}`} />
          ))}
        </ImagesSection>
        <DetailsSection>
          <h2>{product?.category?.toUpperCase().split("/")[2]}</h2>
          <h1>{product?.name}</h1>
          <small>By {product?.postedBy}</small>
          <p>{product?.description}</p>
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
              MRP ₹{product?.price}
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
              {product?.sizes
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
              {product?.colors?.map(({ name, images }) => (
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
              <Button $color="secondary">Added to Cart</Button>
            ) : (
              <Button
                $color="primary"
                style={{ maxWidth: "100%" }}
                onClick={() => handleAddToCart(product!)}
              >
                <MdShoppingBag /> ADD TO CART
              </Button>
            )}
            <Button $outlined style={{ maxWidth: "100%" }}>
              <IoMdHeartEmpty /> WISHLIST
            </Button>
          </div>
        </DetailsSection>
      </ProductContainer>
    </div>
  );
};

export default Product;
