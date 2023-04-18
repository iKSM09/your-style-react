import styled from "styled-components";

import Navigation from "../components/navigation/Navigation.component";
import Categories from "../components/categories/Categories.component";
import Card from "../components/card/Card.component";

const Banner = styled.div`
  height: 280px;
  background-color: lightblue;
`;

const Home = () => {
  return (
    <div>
      <Navigation />
      <Banner></Banner>
      <Categories />
      <section title="Current Sales">
        <h2>Current Sales</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <section title="Best Selling">
        <h2>Best Selling</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <section title="Featured">
        <h2>Featured</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <footer>
        <p>
          copyright of <span>yourStyle.com</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;
