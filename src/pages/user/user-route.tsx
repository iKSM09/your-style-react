import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";

export const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/user/$userId",
});
