import { Route } from "@tanstack/router";
import { storeRoute } from "../store/Store.route";
import ProductList from "./ProductList.page";

export const productListRoute = new Route({
  getParentRoute: () => storeRoute,
  path: "/$for",
});

export const productListIndexRoute = new Route({
  getParentRoute: () => productListRoute,
  path: "/",
  component: ProductList,
});
