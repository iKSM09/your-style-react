import { Router, RootRoute } from "@tanstack/router";

import App from "./App";
import { indexRoute } from "./pages/Home.page";
import { notFoundRoute } from "./pages/404.page";
import {
  shopRoute,
  shopIndexRoute,
  shopForRoute,
  shopForIndexRoute,
} from "./pages/ProductList.page";
import { productRoute, productIndexRoute } from "./pages/Product.page";
import { exploreIndexRoute, exploreRoute } from "./pages/Explore.page";

export const rootRoute = new RootRoute({ component: App });

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute.addChildren([
    shopIndexRoute,
    shopForRoute.addChildren([
      shopForIndexRoute,
      productRoute.addChildren([productIndexRoute]),
    ]),
  ]),
  exploreRoute.addChildren([exploreIndexRoute]),
  notFoundRoute,
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
