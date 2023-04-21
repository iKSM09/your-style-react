// import Navigation from "../components/navigation/Navigation.component";
import Jumbotron from "../components/jumbotron/Jumbotron.component";
import Categories from "../components/categories/Categories.component";
import Card from "../components/card/Card.component";

const Home = () => {
  return (
    <div>
      <Jumbotron />
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
    </div>
  );
};

export default Home;
