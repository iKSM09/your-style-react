import { Router, Route, RootRoute } from "@tanstack/router";

import App from "./App";
import Home from "./pages/Home.page";
import Shop from "./pages/Shop.page";

const rootRoute = new RootRoute({ component: App });

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "shop",
  component: Shop,
});

const shopMenRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/men",
  component: () => <h1>Men's</h1>,
});

const shopWomenRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/women",
  component: () => <h1>Women's</h1>,
});

const shopKidsRoute = new Route({
  getParentRoute: () => shopRoute,
  path: "/kids",
  component: () => <h1>Kid's</h1>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute.addChildren([shopMenRoute, shopWomenRoute, shopKidsRoute]),
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
