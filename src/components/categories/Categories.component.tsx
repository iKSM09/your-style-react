import { ReactNode } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdOutlineLocalOffer } from "react-icons/md";

type CategoryProps = {
  children: ReactNode;
  title: string;
};

const CategoriesContainer = styled.div`
  margin: 24px 12px;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  background-color: lightcoral;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = ({ children, title }: CategoryProps) => {
  return (
    <CategoryContainer>
      <IconContainer>{children}</IconContainer>
      <p>{title}</p>
    </CategoryContainer>
  );
};

const Categories = () => {
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <CategoriesContainer>
        <Category title="Top Offers">
          <MdOutlineLocalOffer />
        </Category>
        <Category title="Men's Suits">
          <MdOutlineLocalOffer />
        </Category>
        <Category title="Women's Dresses">
          <MdOutlineLocalOffer />
        </Category>
        <Category title="Women's Top">
          <MdOutlineLocalOffer />
        </Category>
        <Category title="Top Offers">
          <MdOutlineLocalOffer />
        </Category>{" "}
        <Category title="Top Offers">
          <MdOutlineLocalOffer />
        </Category>
        <Category title="Top Offers">
          <MdOutlineLocalOffer />
        </Category>
      </CategoriesContainer>
    </IconContext.Provider>
  );
};

export default Categories;
