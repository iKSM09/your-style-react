import styled from "styled-components";
import { MdSearch, MdOutlineShoppingCart } from "react-icons/md";

const Logo = styled.h3`
  font-family: "Allura", cursive;
  font-size: 2em;
  color: #ffdcc0;

  span {
    color: #f93889;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const UnList = styled.ul`
  padding: 0;
  display: flex;
  gap: 40px;
  align-items: center;
  text-decoration: none;
  list-style: none;
`;

const Navigation = () => {
  return (
    <nav>
      <FlexDiv>
        <p>This season biggest sale - Up to 60% off</p>
        <UnList>
          <li>Seller Register</li>
          <li>USD</li>
          <li>Language</li>
        </UnList>
      </FlexDiv>
      <FlexDiv>
        <Logo>
          your<span>Style</span>
        </Logo>
        <UnList>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
          <li>Explore</li>
        </UnList>
        <FlexDiv>
          <span>
            <MdSearch />
            <input type="search" name="search" id="search" />
          </span>
          <MdOutlineShoppingCart />
          <p>Login</p>
        </FlexDiv>
      </FlexDiv>
    </nav>
  );
};

export default Navigation;
