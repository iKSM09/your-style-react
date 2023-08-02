import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import Home from "./Home.page";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
