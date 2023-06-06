import { Route, useParams } from "@tanstack/router";

import { storeRoute } from "./store/Store.page";
import CardSection from "../components/card-section/CardSection.component";
import Card from "../components/card/Card.component";
import RangeSlider from "../components/range-slider/RangeSlider.component";
import styled from "styled-components";

export const productListRoute = new Route({
  getParentRoute: () => storeRoute,
  path: "/$for",
});

export const productListIndexRoute = new Route({
  getParentRoute: () => productListRoute,
  path: "/",
  component: ProductList,
});

const Header = styled.div`
  padding-block: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductListLayout = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); */
  grid-template-columns: 1fr minmax(240px, 4fr);
  grid-gap: 12px;
  /* align-items: end; */
  /* flex-wrap: wrap; */
`;

const FilterSection = styled.section`
  margin-block: 24px;
  margin-inline-start: 18px;
`;

function ProductList() {
  const params = useParams({ from: productListRoute.id });

  const filterList = {
    categories: [
      {
        name: "topwear",
        label: "Topwear",
      },
      {
        name: "bottomwear",
        label: "Bottomwear",
      },
      {
        name: "traditional_wear",
        label: "Traditional wear",
      },
      {
        name: "sports_wear",
        label: "Sports wear",
      },
      {
        name: "footwear",
        label: "Footwear",
      },
    ],
    colors: ["Red", "Green", "Blue", "black", "White"],
  };

  return (
    <div>
      <h2>{params.for.toUpperCase()}</h2>
      <ProductListLayout className="grid ">
        <FilterSection>
          <aside>
            <Header>
              <h2>Filters</h2>
            </Header>
            <div>
              <Header>
                <h3>Categories</h3>
              </Header>
              <div title="categories filter">
                {filterList.categories.map((category) => (
                  <div key={category.name}>
                    <input type="checkbox" name={category.name} />
                    <label htmlFor={category.name}>{category.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Header>
                <h3>Price</h3>
              </Header>
              <div title="price filter">
                <RangeSlider defaultValue={[0, 20000]} />
                <input
                  type="range"
                  name="price-slider"
                  min="0"
                  max="20000"
                  step="10"
                />
              </div>
            </div>
            <div>
              <Header>
                <h3>Colors</h3>
              </Header>
              <div title="colors filter">
                {filterList.colors.map((color, index) => (
                  <div key={index}>
                    <input type="checkbox" name={color} />
                    <label htmlFor={color}>{color}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Header>
                <h3>Discount</h3>
              </Header>
              <div title="discount filter">
                <input type="radio" name="discount" id="" />
                <label htmlFor="discount">30% or more</label>
              </div>
            </div>
          </aside>
        </FilterSection>

        <CardSection title="Topwear" headerComp={<p>Sort by: Recommended</p>}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardSection>
      </ProductListLayout>
    </div>
  );
}

export default ProductList;
