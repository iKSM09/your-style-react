import { Link } from "@tanstack/router";
import styled from "styled-components";

import blackJacket from "/assets/black_01.jpeg";
import { productRoute } from "../../pages/Product.page";

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
`;

const ImageContainer = styled.div`
  /* width: 240px;
  height: 312px; */
  background-color: lightgoldenrodyellow;
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  /* width: 240px;
  height: 312px; */
  max-width: 100%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  margin-block: 1rem;
  padding-inline: 4px;
  display: flex;
  justify-content: space-between;

  * {
    margin-bottom: 4px;
  }
`;

const Card = () => {
  return (
    <CardContainer>
      <Link
        from={productRoute.id}
        to="/shop/$for/$productId"
        params={{ for: "men", productId: "topwear" }}
        activeOptions={{ exact: true }}
      >
        <ImageContainer>
          <Image src={blackJacket} alt="black Jacket" />
        </ImageContainer>
        <CardInfo>
          <h3>Product Name</h3>
          <p>Price: ₹299</p>
        </CardInfo>
      </Link>
    </CardContainer>
  );
};

export default Card;
