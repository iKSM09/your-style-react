import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px; ;
`;

const ImageContainer = styled.div`
  width: 320px;
  height: 180px;
  background-color: lightgoldenrodyellow;
  border-radius: 12px;
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
      <ImageContainer />
      <CardInfo>
        <h3>Flat 10% Off On Rs.4000+</h3>
        <p>Additional 5% Off On Rs.6000</p>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
