import { Route, useParams } from "@tanstack/router";

import Jumbotron from "../../components/jumbotron/Jumbotron.component";
import Categories from "../../components/categories/Categories.component";
import Card from "../../components/card/Card.component";
import CardSection from "../../components/card-section/CardSection.component";

import { rootRoute } from "../../router";
import Dropdown from "../../components/dropdown/Dropdown.component";

import { useEffect } from "react";
import { productsStore } from "../../store/products.store";

const Home = () => {
  const params = useParams();
  const [products, getAllProducts] = productsStore((state) => [
    state.products,
    state.getAllProducts,
  ]);

  useEffect(() => {
    if (products.length === 0) getAllProducts();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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
        {products?.map((product) => {
          return <Card key={product.id} productInfo={product} />;
        })}
      </CardSection>
      {/* <CardSection
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
        {products?.map((product) => (
          <Card key={product.id} productInfo={product} />
        ))}
      </CardSection> */}
    </div>
  );
};

export default Home;
