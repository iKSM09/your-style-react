import { Router, RootRoute } from "@tanstack/router";

import App from "./App";
import { indexRoute } from "./pages/home/Home.page";
import { notFoundRoute } from "./pages/404-not-found/404.page";
import { storeRoute, storeIndexRoute } from "./pages/store/Store.page";
import {
  productListRoute,
  productListIndexRoute,
} from "./pages/product-list/ProductList.page";
import { productRoute, productIndexRoute } from "./pages/product/Product.page";
import { exploreIndexRoute, exploreRoute } from "./pages/explore/Explore.page";
import {
  sellerRegisterIndexRoute,
  sellerRegisterRoute,
} from "./pages/seller-registration/SellerRegister.component";

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
  // checkoutRoute.addChildren([checkoutIndexRoute]),
  exploreRoute.addChildren([exploreIndexRoute]),
  // userProfileRoute.addChildren([
  //   userProfileIndexRoute,
  //   feedRoute.addChildren([feedIndexRoute]),
  //   addPostRoute.addChildren([addPostIndexRoute]),
  //   userSettingsRoute.addChildren([userSettingsIndexRoute])
  // ]),
  sellerRegisterRoute.addChildren([sellerRegisterIndexRoute]),
  // sellerDashboardRoute.addChildren([
  //   sellerDashboardIndexRoute,
  //   addProductRoute.addChildren([addProductIndexRoute]),
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
