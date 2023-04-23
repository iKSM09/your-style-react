import { Route } from "@tanstack/router";

import Jumbotron from "../components/jumbotron/Jumbotron.component";
import Categories from "../components/categories/Categories.component";
import Card from "../components/card/Card.component";
import CardSection from "../components/card-section/CardSection.component";

import { rootRoute } from "../router";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

function Home() {
  return (
    <div>
      <Jumbotron />
      <Categories />

      <CardSection
        title="Best Selling"
        headerComp={<p>Filter by: Popularity</p>}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardSection>
      <CardSection
        title="Featured"
        headerComp={<p>Filter by: Recommendation</p>}
      >
        <Card />
        <Card />
        <Card />
      </CardSection>
    </div>
  );
}

export default Home;
