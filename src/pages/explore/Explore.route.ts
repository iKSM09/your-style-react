import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import Explore from "./Explore.page";

export const exploreRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
});

export const exploreIndexRoute = new Route({
  getParentRoute: () => exploreRoute,
  path: "/",
  component: Explore,
});
