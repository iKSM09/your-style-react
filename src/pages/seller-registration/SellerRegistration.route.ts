import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";
import SellerRegistration from "./SellerRegistration.page";

export const sellerRegistrationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seller-registration",
});

export const sellerRegistrationIndexRoute = new Route({
  getParentRoute: () => sellerRegistrationRoute,
  path: "/",
  component: SellerRegistration,
});
