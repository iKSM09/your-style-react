import { Route } from "@tanstack/router";

import { rootRoute } from "../../router";

import { BannerSection, BannerMedium } from "./Store.styles";

export const storeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/store",
});

export const storeIndexRoute = new Route({
  getParentRoute: () => storeRoute,
  path: "/",
  component: Store,
});

export default function Store() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Shop</h1>
      </div>
      <BannerSection>
        <BannerMedium></BannerMedium>
        <BannerMedium></BannerMedium>
      </BannerSection>
    </>
  );
}
