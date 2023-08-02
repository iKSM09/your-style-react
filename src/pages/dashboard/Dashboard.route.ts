import { Route } from "@tanstack/router";
import { userRoute } from "../user/User.route";
import Dashboard from "./Dashboard.page";

export const sellerDashboardRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/dashboard",
});

export const sellerDashboardIndexRoute = new Route({
  getParentRoute: () => sellerDashboardRoute,
  path: "/",
  component: Dashboard,
});
