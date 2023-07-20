import { Route } from "@tanstack/router";

import { rootRoute } from "../../router";
import { styled } from "styled-components";
import { productsStore } from "../../store/products.store";
import { deviceWidth } from "../../styles/devices.breakpoints";

export const ImageGallery = styled.section`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-auto-flow: dense;
  grid-gap: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: #d7d7d8;
  overflow: hidden;

  &:nth-child(7n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const exploreRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
});

export const exploreIndexRoute = new Route({
  getParentRoute: () => exploreRoute,
  path: "/",
  component: Explore,
});

function Explore() {
  const products = productsStore((state) => state.products);

  return (
    <div>
      <h2>
        This is an Instagram explore like page, that shows the pictures user
        have put on the platform.
      </h2>
      <ImageGallery>
        {products.map((product) => (
          <ImageContainer key={product.id}>
            <img
              src={product.colors[0].images[0]}
              alt={`${product.name} preview image`}
            />
          </ImageContainer>
        ))}
        {products.map((product) => (
          <ImageContainer key={product.id + product.name}>
            <img
              src={product.colors[0].images[0]}
              alt={`${product.name} preview image`}
            />
          </ImageContainer>
        ))}
        {products.map((product) => (
          <ImageContainer key={product.id + product.category}>
            <img
              src={product.colors[0].images[0]}
              alt={`${product.name} preview image`}
            />
          </ImageContainer>
        ))}
        {products.map((product) => (
          <ImageContainer key={product.id + product.category + product.name}>
            <img
              src={product.colors[0].images[0]}
              alt={`${product.name} preview image`}
            />
          </ImageContainer>
        ))}
        {products.map((product) => (
          <ImageContainer key={product.id + product.name + product.category}>
            <img
              src={product.colors[0].images[0]}
              alt={`${product.name} preview image`}
            />
          </ImageContainer>
        ))}
      </ImageGallery>
    </div>
  );
}

export default Explore;
