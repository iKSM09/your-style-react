import { useState } from "react";
import { Route } from "@tanstack/router";

import { MdStarRate, MdShoppingBag } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

import { productListRoute } from "../product-list/ProductList.page";

import productData from "../../data/data.json";

import {
  DetailsSection,
  Divider,
  Image,
  ImagesSection,
  ProductContainer,
} from "./Product.styles";
import { Button } from "../../components/button/Button.styles";

export const productRoute = new Route({
  getParentRoute: () => productListRoute,
  path: "$productId",
});

export const productIndexRoute = new Route({
  getParentRoute: () => productRoute,
  path: "/",
  component: Product,
});

const StarsRating = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <MdStarRate />
      <p>{productData.rating.stars}</p>
    </div>
  );
};

function Product() {
  const [clothColor, setClothColor] = useState(productData.varients.colors[0]);

  const handleChangeColor = (color: string) => {
    const filtered = productData.varients.colors.filter(
      (index) => index.color === color
    );
    setClothColor(filtered[0]);
    console.log({ clothColor });
  };

  return (
    <div style={{ textAlign: "start" }}>
      <p style={{ padding: "2rem 1rem 0.5rem" }}>{productData.breadcrum}</p>
      <ProductContainer>
        <ImagesSection>
          {clothColor.images.map((img) => (
            <Image src={`/assets/${img}`} alt={img} />
          ))}
        </ImagesSection>
        <DetailsSection>
          <h2>{productData.category}</h2>
          <h1>{productData.name}</h1>
          <small>{productData["product-details"].description}</small>
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
              <StarsRating />
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
              MRP ₹{productData.price}
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
                alignItems: "center",
                gap: "12px",
              }}
            >
              {productData.varients.sizes.map((size) => (
                <button
                  key={size}
                  style={{
                    width: "48px",
                    height: "48px",
                    padding: "12px",
                    fontSize: "14px",
                    borderStyle: "solid",
                    borderColor: "white",
                    textAlign: "center",
                  }}
                >
                  {size}
                </button>
              ))}
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
              {productData.varients.colors.map(({ color, images }) => (
                <Image
                  title={color}
                  key={color}
                  onClick={() => handleChangeColor(color)}
                  src={`/assets/${images[0]}`}
                  alt={color}
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
            <Button $color="primary" style={{ maxWidth: "100%" }}>
              <MdShoppingBag /> ADD TO CART
            </Button>
            <Button $outlined style={{ maxWidth: "100%" }}>
              <IoMdHeartEmpty /> WISHLIST
            </Button>
          </div>
        </DetailsSection>
      </ProductContainer>
    </div>
  );
}

export default Product;
