import { Header } from "../../pages/product-list/ProductList.styles";
import RangeSlider from "../range-slider/RangeSlider.component";
import {
  CheckList,
  CheckListItem,
  FilterMenuContainer,
  FilterMenuHeader,
  FilterSection,
} from "./FilterMenu.styles";
import { ChangeEvent, useEffect, useState } from "react";
import { productsStore } from "../../context/products.store";
import Icon from "../_ui/button/Icon.components";
import { Divider } from "../footer/Footer.styles";

// const filterList = {
//   categories: [
//     {
//       name: "topwear",
//       label: "Topwear",
//     },
//     {
//       name: "bottomwear",
//       label: "Bottomwear",
//     },
//     {
//       name: "traditional_wear",
//       label: "Traditional wear",
//     },
//     {
//       name: "sports_wear",
//       label: "Sports wear",
//     },
//     {
//       name: "footwear",
//       label: "Footwear",
//     },
//   ],
//   colors: ["Red", "Green", "Blue", "Black", "White"],
// };

const filterList = {
  categories: {
    men: ["Topwear", "Bottomwear", "Ethnic wear", "Footwear"],
    women: ["Western wear", "Indian wear", "Footwear"],
    kids: [],
  },
  colors: ["Red", "Green", "Blue", "Black", "White"],
};

type FilterMenuProps = {
  filterFor: "men" | "women" | "kids";
  closeSidebar?: () => void;
};

const FilterMenu = ({ filterFor, closeSidebar }: FilterMenuProps) => {
  const [filters, setFilters] = useState<string[]>([]);
  const setProductFilters = productsStore((state) => state.setProductFilters);

  useEffect(() => {
    setProductFilters(filters);
  }, [filters]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    checked
      ? setFilters(() => [...filters, name])
      : setFilters(() => filters.filter((filter) => filter !== name));
  };

  return (
    <FilterMenuContainer>
      <FilterMenuHeader>
        <h2>Filters</h2>
        {closeSidebar && <Icon.Close $pilled $ghosted onClick={closeSidebar} />}
      </FilterMenuHeader>
      <Divider />
      {/* <FilterSection>
        <Header>
          <h3>Price</h3>
        </Header>
        <RangeSlider defaultValue={[0, 20000]} />
      </FilterSection> */}
      <FilterSection>
        <Header>
          <h3>Categories</h3>
        </Header>
        <CheckList title="categories filter">
          {filterList?.categories?.[filterFor] &&
            filterList?.categories?.[filterFor].map((subCategory) => (
              <CheckListItem key={subCategory.toLowerCase().replace(/\s/g, "")}>
                <label htmlFor={subCategory.toLowerCase().replace(/\s/g, "")}>
                  {subCategory}
                </label>
                <input
                  type="checkbox"
                  id={subCategory.toLowerCase().replace(/\s/g, "")}
                  name={subCategory.toLowerCase().replace(/\s/g, "")}
                  value={subCategory.toLowerCase().replace(/\s/g, "")}
                  onChange={(e) => handleOnChange(e)}
                />
              </CheckListItem>
            ))}
          {/* {filterList.categories.map((category) => (
            <CheckListItem key={category.name}>
              <label htmlFor={category.name}>{category.label}</label>
              <input
                type="checkbox"
                id={category.name}
                name={category.name}
                value={category.name}
                onChange={(e) => handleOnChange(e)}
              />
            </CheckListItem>
          ))} */}
        </CheckList>
      </FilterSection>
      {/* <FilterSection>
        <Header>
          <h3>Colors</h3>
        </Header>
        <CheckList title="colors filter">
          {filterList.colors.map((color, index) => (
            <CheckListItem key={index}>
              <label htmlFor={color}>{color}</label>
              <input type="checkbox" id={color} name={color} value={color} />
            </CheckListItem>
          ))}
        </CheckList>
      </FilterSection> */}
      {/* <FilterSection>
        <Header>
          <h3>Discount</h3>
        </Header>
        <div title="discount filter">
          <label htmlFor="discount">30% or more</label>
          <input type="radio" name="discount" id="" />
        </div>
      </FilterSection> */}
    </FilterMenuContainer>
  );
};

export default FilterMenu;
