import { MdOutlineLibraryAdd } from "react-icons/md";
import styled from "styled-components";

export const AddProductIconContainer = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: transparent;
  color: inherit;
  border: unset;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #ffdcc0;
    color: #062122;
  }
`;

const AddProductIcon = ({ size = "1rem" }) => {
  return (
    <AddProductIconContainer>
      <MdOutlineLibraryAdd size={size} />
    </AddProductIconContainer>
  );
};

export default AddProductIcon;
