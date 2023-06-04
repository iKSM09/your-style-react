import { Route } from "@tanstack/router";

import { rootRoute } from "../router";

export const exploreRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/explore",
});

export const exploreIndexRoute = new Route({
  getParentRoute: () => exploreRoute,
  path: "/",
  component: Explore,
});

function Explore() {
  return (
    <div>
      <h2>
        This is an Instagram explore like page, that shows the pictures user
        have put on the platform.
      </h2>
    </div>
  );
}

export default Explore;
