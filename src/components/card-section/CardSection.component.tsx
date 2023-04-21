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
`;

const Header = styled.div`
  padding-block: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardSection = ({ title, headerComp, children }: CardSectionProps) => {
  return (
    <CardSectionContainer title="Current Sales">
      <Header>
        <h2>{title}</h2>
        {headerComp}
      </Header>
      <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
        {children}
      </div>
    </CardSectionContainer>
  );
};

export default CardSection;
