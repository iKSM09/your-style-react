import { Link } from "@tanstack/router";

import styled from "styled-components";

const LogoContainer = styled.h3`
  font-family: "Allura", cursive;
  font-size: 2em;
  color: #ffdcc0;

  span {
    color: #f93889;
  }
`;

const Logo = () => {
  const styling = {
    style: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    <Link to="/" activeProps={styling} inactiveProps={styling}>
      <LogoContainer>
        your<span>Style</span>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
