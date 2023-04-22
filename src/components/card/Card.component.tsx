import { Link } from "@tanstack/router";
import styled from "styled-components";

import blackJacket from "../../data/black_01.jpeg";

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
  padding-inline: 4px;

  * {
    margin-bottom: 4px;
  }
`;

const Card = () => {
  return (
    <CardContainer>
      <Link to="/shop/men/$productId" params={{ productId: "topwear" }}>
        <ImageContainer>
          <Image src={blackJacket} alt="black Jacket" />
        </ImageContainer>
        <CardInfo>
          <h3>Flat 10% Off On Rs.4000+</h3>
          <p>Additional 5% Off On Rs.6000</p>
        </CardInfo>
      </Link>
    </CardContainer>
  );
};

export default Card;
