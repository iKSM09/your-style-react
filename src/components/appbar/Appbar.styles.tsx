import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";

export const AppbarContainer = styled.section`
  position: fixed;
  inset: auto 0 0;
  z-index: 10;

  margin: 8px;
  padding: 12px;
  max-width: 100vw;

  color: var(--on-tertiary);
  background-color: var(--tertiary);
  border-radius: var(--border-curved);

  display: flex;
  justify-content: space-around;

  * {
    color: var(--on-tertiary);

    :focus,
    :hover,
    :active {
      color: var(--on-primary-container);
    }
  }

  @media screen and (${deviceWidth.approxLaptop}) {
    display: none;
  }
`;
