import { useEffect } from "react";

import AuthState from "../../components/auth/AuthState.component";

const SellerRegistration = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return <AuthState isVendor={true} />;
};

export default SellerRegistration;
