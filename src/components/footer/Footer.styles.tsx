import styled from "styled-components";

export const FooterContainer = styled.footer`
  padding: 2rem 1rem 8px;
  background-color: #09191a;
  color: white;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
`;

export const Divider = styled.hr`
  margin-block: 0.5rem;
  opacity: 0.3;
`;

export const FooterLinkSection = styled.section`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

// Benefits Section
export const BenefitsSection = styled.section`
  padding-block: 24px;
  background-color: #1e484b;
  color: white;
  display: flex;
  justify-content: space-evenly;
  gap: 12px;
`;

export const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  background-color: #d64d87;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BenefitsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Image = styled.img`
  max-width: 100%;
`;
