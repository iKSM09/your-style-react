import { Header } from "../../pages/product-list/ProductList.styles";
import RangeSlider from "../range-slider/RangeSlider.component";
import Sidebar from "../sidebar/Sidebar.component";

type FilterMenuProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const FilterMenu = ({ sidebar, closeSidebar }: FilterMenuProps) => {
  const filterList = {
    categories: [
      {
        name: "topwear",
        label: "Topwear",
      },
      {
        name: "bottomwear",
        label: "Bottomwear",
      },
      {
        name: "traditional_wear",
        label: "Traditional wear",
      },
      {
        name: "sports_wear",
        label: "Sports wear",
      },
      {
        name: "footwear",
        label: "Footwear",
      },
    ],
    colors: ["Red", "Green", "Blue", "black", "White"],
  };

  return (
    <>
      <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} position="right">
        <aside>
          <Header>
            <h2>Filters</h2>
          </Header>
          <div>
            <Header>
              <h3>Categories</h3>
            </Header>
            <div title="categories filter">
              {filterList.categories.map((category) => (
                <div key={category.name}>
                  <input type="checkbox" name={category.name} />
                  <label htmlFor={category.name}>{category.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Header>
              <h3>Price</h3>
            </Header>
            <div title="price filter">
              <RangeSlider defaultValue={[0, 20000]} />
              {/* <input
                  type="range"
                  name="price-slider"
                  min="0"
                  max="20000"
                  step="10"
                /> */}
            </div>
          </div>
          <div>
            <Header>
              <h3>Colors</h3>
            </Header>
            <div title="colors filter">
              {filterList.colors.map((color, index) => (
                <div key={index}>
                  <input type="checkbox" name={color} />
                  <label htmlFor={color}>{color}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Header>
              <h3>Discount</h3>
            </Header>
            <div title="discount filter">
              <input type="radio" name="discount" id="" />
              <label htmlFor="discount">30% or more</label>
            </div>
          </div>
        </aside>
      </Sidebar>
    </>
  );
};

export default FilterMenu;
