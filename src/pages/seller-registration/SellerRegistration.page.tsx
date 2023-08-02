import { useEffect, useState } from "react";

import styled from "styled-components";
import AuthState from "../../components/auth/AuthState.component";

const VendorAuthContainer = styled.main`
  margin: 1rem auto;
  width: min(100vw, 425px);
`;

const SellerRegistration = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <VendorAuthContainer>
      <AuthState isVendor={true} />
    </VendorAuthContainer>
  );
};

export default SellerRegistration;
