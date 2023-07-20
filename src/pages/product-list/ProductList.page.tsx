import { Route, useParams } from "@tanstack/router";

import { storeRoute } from "../store/Store.page";
import CardSection from "../../components/card-section/CardSection.component";

import { FilterSection, ProductListLayout } from "./ProductList.styles";
import Dropdown from "../../components/dropdown/Dropdown.component";
import FilterMenu from "../../components/filter-menu/FilterMenu.component";
import { useEffect } from "react";
import { paths } from "../add-product/AddProduct.page";
import Card from "../../components/card/Card.component";
import { productsStore } from "../../store/products.store";

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
  const categoryPath = paths.filter((path) => path.category === params.for);

  const [productsByCategory, filterProductsByCategrory] = productsStore(
    (state) => [state.productsByCategory, state.filterProductsByCategrory]
  );

  useEffect(() => {
    filterProductsByCategrory(params.for);
  }, [params.for]);

  return (
    <div>
      <h2>{params.for.toUpperCase()}</h2>
      <ProductListLayout className="grid">
        <FilterSection className="laptop-only">
          <FilterMenu />
        </FilterSection>
        <div>
          {categoryPath.map(({ subCategory }) =>
            subCategory.map((list) => (
              <CardSection
                key={list.name}
                title={list.name.toUpperCase()}
                headerComp={
                  <Dropdown
                    defaultOption="Recommended"
                    options={["Recommended", "Latest First", "Popularity"]}
                    additional="Sort by "
                    title="Sort by"
                  />
                }
              >
                {productsByCategory
                  ?.filter((data) => data.category.split("/")[1] === list.name)
                  .map((product) => (
                    <Card key={product.id} productInfo={product} />
                  ))}
              </CardSection>
            ))
          )}
        </div>
      </ProductListLayout>
    </div>
  );
}

export default ProductList;
