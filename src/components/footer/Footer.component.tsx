import React from "react";
import { Link } from "@tanstack/router";

import Logo from "../logo/Logo.component";

import styled from "styled-components";
import PaymentMethods from "../../assets/payment-method.svg";

// const footerData = {
//   "online_shopping": {
//     {
//       "name": "men",

//     }
//   }
// }

const FooterContainer = styled.footer`
  padding: 2rem 1rem 8px;
  background-color: #09191a;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
`;

const Divider = styled.hr`
  margin-block: 0.5rem;
  opacity: 0.3;
`;

const FooterLinkSection = styled.section`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

// Benefits Section
const BenefitsSection = styled.section`
  padding-block: 24px;
  background-color: #1e484b;
  display: flex;
  justify-content: space-evenly;
  gap: 12px;
`;

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  background-color: #d64d87;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BenefitsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

type BenefitsCardProps = {
  icon?: React.ReactNode;
  title: string;
  text: string;
};

const BenefitsCard = ({ icon, title, text }: BenefitsCardProps) => {
  return (
    <BenefitsCardContainer>
      <IconContainer>{icon}</IconContainer>
      <div>
        <p>{title}</p>
        <small>{text}</small>
      </div>
    </BenefitsCardContainer>
  );
};

const Footer = () => {
  return (
    <>
      <BenefitsSection>
        <BenefitsCard title="Free Shipping" text="On Order Above Rs.299" />
        <BenefitsCard title="Easy Returns" text="15-Day Return Policy" />
        <BenefitsCard title="100% Authentic" text="Products Sourced Directly" />
      </BenefitsSection>
      <FooterContainer>
        <FlexDiv>
          <FooterLinkSection>
            <h5>ONLINE SHOPPING</h5>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/kids">Kids</Link>
          </FooterLinkSection>
          <FooterLinkSection>
            <h5>Useful Links</h5>
            <Link to="/">Blog</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Site Map</Link>
            <Link to="/">Corporate Information</Link>
            <Link to="/">Whitehat</Link>
          </FooterLinkSection>
          <FooterLinkSection>
            <h5>Customer Policies</h5>
            <Link to="/">Contact Us</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">T&C</Link>
            <Link to="/">Terms Of Use</Link>
            <Link to="/">Returns</Link>
            <Link to="/">Privacy policy</Link>
          </FooterLinkSection>
          <FooterLinkSection>
            <h5>Social Media</h5>
            <Link to="/">Facebook</Link>
            <Link to="/">Instagrm</Link>
            <Link to="/">Twitter</Link>
          </FooterLinkSection>
        </FlexDiv>
        <Divider />
        <FlexDiv style={{ alignItems: "center" }}>
          <Logo />
          <p>© 2023 yourStyle. All rights reserved.</p>
          <img
            height={24}
            src={PaymentMethods}
            alt="supported payment methods"
          />
        </FlexDiv>
      </FooterContainer>
    </>
  );
};

export default Footer;
