import { Route } from "@tanstack/router";
import { sellerDashboardRoute } from "../dashboard/Dashboard.route";
import AddProduct from "./AddProduct.page";

export const addProductRoute = new Route({
  getParentRoute: () => sellerDashboardRoute,
  path: "/addProduct",
});

export const addProductIndexRoute = new Route({
  getParentRoute: () => addProductRoute,
  path: "/",
  component: AddProduct,
});
