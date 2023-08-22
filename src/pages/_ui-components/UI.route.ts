import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import UI from "./UI.page";

export const uiRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ui",
  component: UI,
});
