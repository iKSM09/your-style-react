import React from "react";
import { Link } from "@tanstack/router";

import Logo from "../logo/Logo.component";

const men = {
  Topwear: [
    "T-Shirts",
    "Casual Shirts",
    "Formal Shirts",
    "Sweatshirts",
    "Sweaters",
    "Jackets",
    "Blazers & Coats",
    "Suits",
    "Rain Jackets",
  ],

  Bottomwear: [
    "Jeans",
    "Casual Trousers",
    "Formal Trousers",
    "Shorts",
    "Track Pants & Joggers",
  ],

  "Indian & Festive Wear": [
    "Kurtas & Kurta Sets",
    "Sherwanis",
    "Nehru Jackets",
    "Dhotis",
  ],
};

const women = {
  "Indian & Fusion Wear": [
    "Kurtas & Suits",
    "Kurtis, Tunics & Tops",
    "Sarees",
    "Ethnic Wear",
    "Leggings, Salwars & Churidars",
    "Skirts & Palazzos",
    "Dress Materials",
    "Lehenga Cholis",
    "Dupattas & Shawls",
    "Jackets",
  ],

  "Western Wear": [
    "Dresses",
    "Tops",
    "Tshirts",
    "Jeans",
    "Trousers & Capris",
    "Shorts & Skirts",
    "Co-ords",
    "Playsuits",
    "Jumpsuits",
    "Shrugs",
    "Sweaters & Sweatshirts",
    "Jackets & Coats",
    "Blazers & Waistcoats",
  ],
};

import PaymentMethods from "../../assets/payment-method.svg";
import {
  BenefitsCardContainer,
  BenefitsSection,
  Divider,
  FlexDiv,
  FooterContainer,
  FooterLinkSection,
  IconContainer,
  Image,
} from "./Footer.styles";

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
            <Link to="/store/$for" params={{ for: "men" }}>
              Men
            </Link>
            <Link to="/store/$for" params={{ for: "women" }}>
              Women
            </Link>
            <Link to="/store/$for" params={{ for: "kids" }}>
              Kids
            </Link>
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
          <small>© 2023 yourStyle. All rights reserved.</small>
          <Image
            height={20}
            src={PaymentMethods}
            alt="supported payment methods"
          />
        </FlexDiv>
      </FooterContainer>
    </>
  );
};

export default Footer;
