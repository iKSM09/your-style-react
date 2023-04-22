import { Router, Route, RootRoute } from "@tanstack/router";

import App from "./App";
import Home from "./pages/Home.page";
import Shop from "./pages/Shop.page";
import ProductList from "./pages/ProductList.page";
import Product from "./pages/Product.page";

const rootRoute = new RootRoute({ component: App });

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <h1>404</h1>,
});

const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/shop",
});

const shopMenRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/men",
});

const menIndexRoute = new Route({
  getParentRoute: () => shopMenRoute,
  path: "/",
  component: ProductList,
});

const menProductRoute = new Route({
  getParentRoute: () => shopMenRoute,
  path: "$productId",
  component: Product,
});

const shopWomenRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/women",
  component: Shop,
});

const shopKidsRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/kids",
  component: Shop,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute.addChildren([
    shopMenRoute.addChildren([menIndexRoute, menProductRoute]),
    shopWomenRoute,
    shopKidsRoute,
  ]),
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
