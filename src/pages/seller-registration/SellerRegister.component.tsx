import { Route } from "@tanstack/router";
import { rootRoute } from "../../router";

export const sellerRegisterRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seller-registration",
});

export const sellerRegisterIndexRoute = new Route({
  getParentRoute: () => sellerRegisterRoute,
  path: "/",
  component: SellerRegister,
});

function SellerRegister() {
  return <h1>SellerRegister</h1>;
}

export default SellerRegister;
