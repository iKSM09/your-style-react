import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import Store from "./Store.page";

export const storeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/store",
});

export const storeIndexRoute = new Route({
  getParentRoute: () => storeRoute,
  path: "/",
  component: Store,
});
