import { Route, useParams } from "@tanstack/router";

import { rootRoute } from "../router";

export const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/shop",
});

export const shopIndexRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/",
  component: () => <h1>Shop</h1>,
});

export const shopForRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/$for",
});

export const shopForIndexRoute = new Route({
  getParentRoute: () => shopForRoute,
  path: "/",
  component: ProductList,
});

function ProductList() {
  const params = useParams({ from: shopForRoute.id });

  return (
    <div>
      <h1>{params.for.toUpperCase()}</h1>
      <h2>- Filter</h2>
      <h2>- Product List</h2>
    </div>
  );
}

export default ProductList;
