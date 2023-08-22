import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import Icon from "../_ui/button/Icon.components";

const SearchContainer = styled.div`
  padding-inline: 0 16px;
  height: 40px;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
  border: 1px solid var(--secondary-container);
  border-radius: var(--border-curved);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 8px;

  input {
    width: 100%;
    height: 100%;
    color: inherit;
    background-color: transparent;
    border-color: transparent;
  }

  &:hover {
    color: var(--on-surface-variant);
    background-color: var(--surface-variant);
    border: 1px solid var(--surface-variant);
  }

  &:focus,
  &:active {
    border: 1px solid tomato;
  }

  /* input:active,
  input:focus,
  input:hover {
    background-color: transparent;
    outline: none;
  } */
`;

const SearchBar = () => {
  return (
    <SearchContainer>
      <Icon.Search $ghosted $highlight />
      <input type="search" name="search" id="search" placeholder="search..." />
    </SearchContainer>
  );
};

export default SearchBar;
