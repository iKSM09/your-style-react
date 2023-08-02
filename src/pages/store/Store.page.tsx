import { BannerSection, BannerMedium } from "./Store.styles";

const Store = () => {
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
