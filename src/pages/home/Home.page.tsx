import { Route } from "@tanstack/router";

import Jumbotron from "../../components/jumbotron/Jumbotron.component";
import Categories from "../../components/categories/Categories.component";
import Card from "../../components/card/Card.component";
import CardSection from "../../components/card-section/CardSection.component";

import { rootRoute } from "../../router";
import Dropdown from "../../components/dropdown/Dropdown.component";

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
        headerComp={
          <Dropdown
            defaultOption="Popularity"
            options={["Recommended", "Latest First", "Popularity"]}
            additional="Filter by "
            title="Filter by"
          />
        }
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
        headerComp={
          <Dropdown
            defaultOption="Trending"
            options={["Recommended", "Trending", "Popularity"]}
            additional="Filter by "
            title="Filter by"
          />
        }
      >
        <Card />
        <Card />
        <Card />
      </CardSection>
    </div>
  );
}

export default Home;
