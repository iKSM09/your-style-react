import { useState } from "react";
import { Route } from "@tanstack/router";

import { rootRoute } from "../../router";

import Register from "../../components/auth/Register.component";
import SignIn from "../../components/auth/SignIn.component";

import styled from "styled-components";

const VendorAuthContainer = styled.main`
  margin-block: 1rem;
  width: min(100vw, 425px);
`;

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
  const [newUser, setNewUser] = useState(false);

  const isNewUser = () => setNewUser((bool) => !bool);

  return (
    <VendorAuthContainer>
      {newUser ? (
        <Register isNewUser={isNewUser} isVendor={true} />
      ) : (
        <SignIn isNewUser={isNewUser} />
      )}
    </VendorAuthContainer>
  );
}

export default SellerRegister;
