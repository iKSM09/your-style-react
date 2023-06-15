import styled from "styled-components";
import { MdSearch } from "react-icons/md";

const SearchContainer = styled.div`
  height: 40px;
  padding: 12px;
  background-color: #09191a;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 32px;

  input {
    color: white;
    background-color: transparent;
    border-color: transparent;
  }

  input:active,
  input:focus,
  input:hover {
    background-color: transparent;
    outline: none;
  }
`;

const SearchBar = () => {
  return (
    <SearchContainer>
      <MdSearch />
      <input type="search" name="search" id="search" placeholder="search..." />
    </SearchContainer>
  );
};

export default SearchBar;
