import { MdClose } from "react-icons/md";
import { Header } from "../../pages/product-list/ProductList.styles";
import RangeSlider from "../range-slider/RangeSlider.component";
import {
  CheckList,
  CheckListItem,
  FilterMenuContainer,
  FilterMenuHeader,
  FilterSection,
} from "./FilterMenu.styles";
import CloseIcon from "../button/CloseIcon.component";

type FilterMenuProps = {
  closeSidebar?: () => void;
};

const FilterMenu = ({ closeSidebar }: FilterMenuProps) => {
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
    <FilterMenuContainer>
      <FilterMenuHeader>
        <Header>
          <h2>Filters</h2>
        </Header>
        {closeSidebar && (
          <span onClick={closeSidebar}>
            <CloseIcon />
          </span>
        )}
      </FilterMenuHeader>
      <FilterSection>
        <Header>
          <h3>Categories</h3>
        </Header>
        <CheckList title="categories filter">
          {filterList.categories.map((category) => (
            <CheckListItem key={category.name}>
              <label htmlFor={category.name}>{category.label}</label>
              <input type="checkbox" name={category.name} />
            </CheckListItem>
          ))}
        </CheckList>
      </FilterSection>
      <FilterSection>
        <Header>
          <h3>Price</h3>
        </Header>
        {/* <div title="price filter"></div> */}
        <RangeSlider defaultValue={[0, 20000]} />
      </FilterSection>
      <FilterSection>
        <Header>
          <h3>Colors</h3>
        </Header>
        <CheckList title="colors filter">
          {filterList.colors.map((color, index) => (
            <CheckListItem key={index}>
              <label htmlFor={color}>{color}</label>
              <input type="checkbox" name={color} />
            </CheckListItem>
          ))}
        </CheckList>
      </FilterSection>
      <FilterSection>
        <Header>
          <h3>Discount</h3>
        </Header>
        <div title="discount filter">
          <label htmlFor="discount">30% or more</label>
          <input type="radio" name="discount" id="" />
        </div>
      </FilterSection>
    </FilterMenuContainer>
  );
};

export default FilterMenu;
