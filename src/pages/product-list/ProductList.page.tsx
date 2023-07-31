import { Route, useParams } from "@tanstack/router";

import { storeRoute } from "../store/Store.page";
import CardSection from "../../components/card-section/CardSection.component";

import { FilterSection, ProductListLayout } from "./ProductList.styles";
import Dropdown from "../../components/dropdown/Dropdown.component";
import FilterMenu from "../../components/filter-menu/FilterMenu.component";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card.component";
import { ProductDataTypes, productsStore } from "../../store/products.store";
import { set } from "zod";

export const productListRoute = new Route({
  getParentRoute: () => storeRoute,
  path: "/$for",
});

export const productListIndexRoute = new Route({
  getParentRoute: () => productListRoute,
  path: "/",
  component: ProductList,
});

function ProductList() {
  const params = useParams({ from: productListRoute.id });
  const [
    productsByCategory,
    productFilters,
    filterProductsByCategrory,
    setProductFilters,
  ] = productsStore((state) => [
    state.productsByCategory,
    state.productFilters,
    state.filterProductsByCategrory,
    state.setProductFilters,
  ]);
  const [products, setProducts] =
    useState<ProductDataTypes[]>(productsByCategory);

  useEffect(() => {
    setProductFilters([]);
    filterProductsByCategrory(params.for);
    setProducts(productsByCategory);
  }, [params.for]);

  useEffect(() => {
    const filteredProd =
      productFilters.length == 0
        ? productsByCategory
        : productsByCategory.filter((product) =>
            productFilters.includes(product.category.split("/")[1])
          );

    setProducts(filteredProd);
  }, [productFilters]);

  return (
    <div>
      <ProductListLayout className="grid">
        <FilterSection className="laptop-only">
          <FilterMenu
            filterFor={
              (params.for === "men" || "women" || "kids") &&
              (params.for as "men" | "women" | "kids")
            }
          />
        </FilterSection>
        <div>
          <CardSection
            title={`All Products for ${params.for?.toUpperCase()}`}
            headerComp={
              <Dropdown
                defaultOption="Recommended"
                options={["Recommended", "Latest First", "Popularity"]}
                additional="Sort by "
                title="Sort by"
              />
            }
          >
            {products
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((product) => (
                <Card key={product.id} productInfo={product} />
              ))}
          </CardSection>
        </div>
      </ProductListLayout>
    </div>
  );
}

export default ProductList;
