import { useEffect } from "react";
import { BannerSection, BannerMedium } from "./Store.styles";

const Store = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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
};

export default Store;
