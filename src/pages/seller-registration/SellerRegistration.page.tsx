import { useState } from "react";

import Register from "../../components/auth/Register.component";
import SignIn from "../../components/auth/SignIn.component";

import styled from "styled-components";
import AuthState from "../../components/auth/AuthState.component";

const VendorAuthContainer = styled.main`
  margin: 1rem auto;
  width: min(100vw, 425px);
`;

const SellerRegistration = () => {
  return (
    <VendorAuthContainer>
      <AuthState isVendor={true} />
    </VendorAuthContainer>
  );
};

export default SellerRegistration;
