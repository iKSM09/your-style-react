import { Link } from "@tanstack/router";

import Logo from "../logo/Logo.component";
import SearchBar from "../search-bar/SearchBar.component";

import styled from "styled-components";
import { MdExpandMore, MdSearch, MdOutlineShoppingCart } from "react-icons/md";

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  background-color: #1e484b;
`;

const NavPlaceholder = styled.div`
  width: 100%;
  height: 87.6px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const UpperNav = styled(FlexDiv)`
  height: 32px;
  padding-inline: 1rem;
  background-color: #062122;

  & > small {
    font-style: italic;
  }

  ul {
    padding: 0;
    display: flex;
    gap: 24px;
    align-items: center;
    text-decoration: none;
    list-style: none;

    li {
      display: flex;
      align-items: center;
    }
  }
`;

const Divider = styled.hr`
  opacity: 0.4;
`;

const MainNav = styled(FlexDiv)`
  height: 54px;
  padding-inline: 1rem;
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
    <section>
      <Nav>
        <UpperNav>
          <small>This season biggest sale - Up to 60% off</small>
          <ul>
            <li>
              <small>Seller Register</small>
            </li>
            <li>
              <small>USD</small>
              <MdExpandMore />
            </li>
            <li>
              <small>English</small>
              <MdExpandMore />
            </li>
          </ul>
        </UpperNav>
        <Divider />
        <MainNav>
          <Logo />
          <UnList>
            <li>
              <Link to="/men">Men</Link>
            </li>
            <li>
              <Link to="/women">Women</Link>
            </li>
            <li>
              <Link to="/kids">Kids</Link>
            </li>
            <li>
              <Link to="/">Explore</Link>
            </li>
          </UnList>
          <FlexDiv>
            <SearchBar />
            <MdOutlineShoppingCart size="20px" />
            <p>Login</p>
          </FlexDiv>
        </MainNav>
      </Nav>
      <NavPlaceholder></NavPlaceholder>
    </section>
  );
};

export default Navigation;
