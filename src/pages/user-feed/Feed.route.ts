import { Route } from "@tanstack/router";
import { userRoute } from "../user/User.route";
import Feed from "./Feed.page";

export const feedRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/feed",
});

export const feedIndexRoute = new Route({
  getParentRoute: () => feedRoute,
  path: "/",
  component: Feed,
});
