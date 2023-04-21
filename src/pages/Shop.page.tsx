import React from "react";
import styled from "styled-components";
import { Outlet } from "@tanstack/router";

import Jumbotron from "../components/jumbotron/Jumbotron.component";

const BannerSection = styled.section`
  margin: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const BannerMedium = styled.div`
  height: 280px;
  background-color: lightseagreen;
  border-radius: 8px;
`;

const Shop = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
        <h1>
          <pre> Shop</pre>
        </h1>
      </div>
      <BannerSection>
        <BannerMedium></BannerMedium>
        <BannerMedium></BannerMedium>
      </BannerSection>
    </>
  );
};

export default Shop;
