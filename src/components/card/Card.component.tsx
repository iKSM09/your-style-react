import styled from "styled-components";

const CardContainer = styled.div`
  width: 320px;
  height: 180px;
  background-color: lightgoldenrodyellow;
  border-radius: 12px;
  display: flex;
  flex-direction: column-reverse;
`;

const Card = () => {
  return (
    <CardContainer>
      <div>
        <h3>Flat 10% Off On Rs.4000+</h3>
        <p>Additional 5% Off On Rs.6000</p>
      </div>
    </CardContainer>
  );
};

export default Card;
