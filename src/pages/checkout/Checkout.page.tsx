import { useEffect } from "react";

const Checkout = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return <div>Checkout Cart</div>;
};

export default Checkout;
