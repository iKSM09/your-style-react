import styled from "styled-components";
import { MdSearch, MdOutlineShoppingCart } from "react-icons/md";

import Categories from "../components/categories/Categories.component";
import Card from "../components/card/Card.component";

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

const Banner = styled.div`
  height: 280px;
  background-color: lightblue;
`;

const Home = () => {
  return (
    <div>
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
          <h3>yourStyle</h3>
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
      <Banner></Banner>
      <Categories />
      <h2>Current Sales</h2>
      <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Home;
