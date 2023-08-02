import React from "react";

import Card from "../card/Card.component";

import styled from "styled-components";

type CardSectionProps = {
  title: string;
  headerComp: React.ReactNode;
  children: React.ReactNode;
};

const CardSectionContainer = styled.section`
  margin: 24px 18px;
  /* overflow: hidden; */
`;

const Header = styled.div`
  padding-block: 16px;
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-gap: 12px;
  align-items: end;
  /* flex-wrap: wrap; */
`;

const CardSection = ({ title, headerComp, children }: CardSectionProps) => {
  return (
    <CardSectionContainer>
      <Header>
        <h2>{title}</h2>
        {headerComp}
      </Header>
      <CardHolder>{children}</CardHolder>
    </CardSectionContainer>
  );
};

export default CardSection;
