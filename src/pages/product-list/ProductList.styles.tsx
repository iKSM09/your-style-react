import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";

export const Header = styled.div`
  padding-block: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductListLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(240px, 4fr);
  grid-gap: 12px;

  @media screen and (${deviceWidth.ltLaptop}) {
    display: block;
  }
`;

export const FilterSection = styled.section`
  margin-block: 24px;
  margin-inline-start: 18px;
`;
