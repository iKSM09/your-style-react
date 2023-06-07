import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.div`
  display: flex;
`;

export const UnstyledButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  background: unset;
  border: unset;
`;

export const DropdownOptionsBox = styled.div`
  position: absolute;
  z-index: 100;
  left: 50% !important;
  right: auto !important;
  text-align: center !important;
  transform: translate(-50%, 0) !important;
`;

export const DropdownOptions = styled.ul`
  list-style: none;
  background-color: #fff;
  color: #062122;
  width: 150px;
  margin: 0;
  display: flex;
  gap: 0 !important;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  li {
    width: 100%;
    margin: 0;
    padding: 8px 8px 0;
  }

  li:hover {
    background-color: #ffdcc0;
  }
`;

export const DropdownOptionButton = styled(UnstyledButton)`
  padding-bottom: 8px;
  border-bottom: 1px solid rgb(6, 33, 34, 0.1);
`;

export const DropdownOptionBoxArrow = styled.div`
  margin: auto;
  width: 0;
  height: 0;
  text-align: center;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgb(246, 246, 246);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
