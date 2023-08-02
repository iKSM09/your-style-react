import { Route } from "@tanstack/router";
import { productListRoute } from "../product-list/ProductList.route";
import Product from "./Product.page";

export const productRoute = new Route({
  getParentRoute: () => productListRoute,
  path: "$productId",
});

export const productIndexRoute = new Route({
  getParentRoute: () => productRoute,
  path: "/",
  component: Product,
});
