import { Router, RootRoute } from "@tanstack/router";

import App from "./App";
import { indexRoute } from "./pages/home/Home.route";
import { storeIndexRoute, storeRoute } from "./pages/store/Store.route";
import {
  productListIndexRoute,
  productListRoute,
} from "./pages/product-list/ProductList.route";
import { productIndexRoute, productRoute } from "./pages/product/Product.route";
import { exploreIndexRoute, exploreRoute } from "./pages/explore/Explore.route";
import {
  sellerRegistrationIndexRoute,
  sellerRegistrationRoute,
} from "./pages/seller-registration/SellerRegistration.route";
import { userRoute } from "./pages/user/User.route";
import { feedIndexRoute, feedRoute } from "./pages/user-feed/Feed.route";
import {
  addPostIndexRoute,
  addPostRoute,
} from "./pages/add-user-post/AddUserPost.route";
import {
  sellerDashboardIndexRoute,
  sellerDashboardRoute,
} from "./pages/dashboard/Dashboard.route";
import {
  addProductIndexRoute,
  addProductRoute,
} from "./pages/add-product/AddProduct.route";
import { uiRoute } from "./pages/_ui-components/UI.route";
import { notFoundRoute } from "./pages/404-not-found/NotFound.route";

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
  sellerRegistrationRoute.addChildren([sellerRegistrationIndexRoute]),
  userRoute.addChildren([
    // userIndexRoute,
    feedRoute.addChildren([feedIndexRoute]),
    addPostRoute.addChildren([addPostIndexRoute]),
    // userSettingsRoute.addChildren([userSettingsIndexRoute]),
    sellerDashboardRoute.addChildren([
      sellerDashboardIndexRoute,
      addProductRoute.addChildren([addProductIndexRoute]),
    ]),
  ]),
  uiRoute,
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
