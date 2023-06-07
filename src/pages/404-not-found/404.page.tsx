import { Route } from "@tanstack/router";

import { rootRoute } from "../../router";

export const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

function NotFound() {
  return <div>404</div>;
}

export default NotFound;
