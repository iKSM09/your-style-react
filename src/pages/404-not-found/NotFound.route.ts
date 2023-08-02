import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import NotFound from "./NotFound.page";

export const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});
