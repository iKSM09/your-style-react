import { ReactNode } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "@tanstack/router";

type CategoryProps = {
  children: ReactNode;
  title: string;
};

const CategoriesContainer = styled.div`
  --gap: 1rem;

  margin: 24px 12px;
  max-width: 100%;

  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  /* grid-auto-columns: calc(30% - var(--gap) / 2); */
  grid-auto-columns: calc(120px - var(--gap) / 2);
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding: var(--gap);
  scrollbar-width: none; /* Firefox */

  & > * {
    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
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
        {/* <Category title="Men's Suits">
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
        </Category> */}
        <Link
          to="/store/$for"
          params={{ for: "men" }}
          className="hide-from-mobile"
        >
          <Category title="Men">
            <MdOutlineLocalOffer />
          </Category>
        </Link>

        <Link
          to="/store/$for"
          params={{ for: "women" }}
          className="hide-from-mobile"
        >
          <Category title="Women">
            <MdOutlineLocalOffer />
          </Category>
        </Link>

        <Link to="/explore" className="laptop-only">
          <Category title="Explore">
            <MdOutlineLocalOffer />
          </Category>
        </Link>
      </CategoriesContainer>
    </IconContext.Provider>
  );
};

export default Categories;
