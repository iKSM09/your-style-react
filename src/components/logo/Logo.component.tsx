import { Link, useParams } from "@tanstack/router";
import styled from "styled-components";
import { productListRoute } from "../../pages/product-list/ProductList.page";
import { preprocess } from "zod";

const LogoContainer = styled.h3`
  font-family: "Allura", cursive;
  font-size: 2em;
  color: #ffdcc0;

  span {
    color: #f93889;
  }

  pre {
    font-family: inherit;
    font-size: inherit;
  }
`;

const Logo = () => {
  const styling = {
    style: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  const params = useParams({ from: productListRoute.id });

  return (
    <Link to="/" activeProps={styling} inactiveProps={styling}>
      <LogoContainer>
        {params.for ? <pre>{params.for}'s </pre> : "your"}
        <span>Style</span>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
