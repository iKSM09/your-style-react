import { Router, RootRoute } from "@tanstack/router";

import App from "./App";
import { indexRoute } from "./pages/Home.page";
import { notFoundRoute } from "./pages/404.page";
import { storeRoute, storeIndexRoute } from "./pages/store/Store.page";
import {
  productListRoute,
  productListIndexRoute,
} from "./pages/ProductList.page";
import { productRoute, productIndexRoute } from "./pages/Product.page";
import { exploreIndexRoute, exploreRoute } from "./pages/Explore.page";
import {
  sellerRegisterIndexRoute,
  sellerRegisterRoute,
} from "./pages/SellerRegister.component";

export const rootRoute = new RootRoute({ component: App });

const routeTree = rootRoute.addChildren([
  indexRoute,
  storeRoute.addChildren([
    storeIndexRoute,
    productListRoute.addChildren([
      productListIndexRoute,
      productRoute.addChildren([productIndexRoute]),
    ]),
  ]),
  exploreRoute.addChildren([exploreIndexRoute]),
  sellerRegisterRoute.addChildren([sellerRegisterIndexRoute]),
  // sellerDashboardRoute.addChildren([
  //   sellerDashboardIndexRoute,
  //   addProductRoute.addChildren([addProductIndexRoute]),
  // ]),
  // userProfileRoute.addChildren([
  //   userProfileIndexRoute,
  //   feedRoute.addChildren([feedIndexRoute]),
  //   addPostRoute.addChildren([addPostIndexRoute]),
  //   userSettingsRoute.addChildren([userSettingsIndexRoute])
  // ]),
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
