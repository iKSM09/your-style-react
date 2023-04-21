// import Navigation from "../components/navigation/Navigation.component";
import Jumbotron from "../components/jumbotron/Jumbotron.component";
import Categories from "../components/categories/Categories.component";
import Card from "../components/card/Card.component";
import CardSection from "../components/card-section/CardSection.component";

const Home = () => {
  return (
    <div>
      <Jumbotron />
      <Categories />
      <CardSection
        title="Current Sale"
        headerComp={<p>CountDown: 02h : 35m : 09s</p>}
      >
        <Card />
      </CardSection>
      <CardSection
        title="Best Selling"
        headerComp={<p>Filter by: Popularity</p>}
      >
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
      </CardSection>
    </div>
  );
};

export default Home;
