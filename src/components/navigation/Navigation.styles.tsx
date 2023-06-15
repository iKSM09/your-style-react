import styled from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";

export const NavContainer = styled.nav`
  --nav-padding: 1rem;

  position: sticky;
  inset: 0 0 auto;
  z-index: 10;

  margin: 0;
  width: min(100wv, 425px);
  color: var(--on-secondary);
  background-color: var(--secondary);

  * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const UpperNavContainer = styled.section`
  padding: 8px var(--nav-padding);
  color: var(--on-surface);
  background-color: var(--surface);
  border-bottom: 1px solid var(--outline);

  small {
    font-style: italic;
  }

  ul {
    margin: 0;
    padding: 0;

    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
    align-items: center;

    text-decoration: none;
    list-style: none;

    li {
      display: flex;
      align-items: center;
    }
  }

  @media screen and (${deviceWidth.approxMobile}) {
    display: none;
  }
`;

export const LowerNavContainer = styled.section`
  padding: 8px var(--nav-padding);
  font-weight: 500;
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  span > * {
    color: var(--primary);
  }
`;

export const NavMainContent = styled.main`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

// export const Nav = styled.nav`
//   max-width: 100%;
//   margin: 0;

//   position: fixed;
//   inset: 0 0 auto;
//   z-index: 10;

//   color: var(--on-surface);
//   background-color: var(--surface);

//   @media ${device.tablet} {
//     border-radius: 0;
//   }
// `;

// export const NavPlaceholder = styled.div`
//   width: 100%;
//   height: 87.6px;
// `;

// export const FlexDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 24px;
// `;

// export const UpperNav = styled(FlexDiv)`
//   height: 32px;
//   padding-inline: 1rem;
//   color: var(--on-surface);
//   background-color: var(--surface);

//   & > small {
//     font-style: italic;
//   }

//   ul {
//     padding: 0;
//     display: flex;
//     gap: 24px;
//     align-items: center;
//     text-decoration: none;
//     list-style: none;

//     li {
//       display: flex;
//       align-items: center;
//     }
//   }
// `;

// export const Divider = styled.hr`
//   opacity: 0.4;
// `;

// export const MainNav = styled(FlexDiv)`
//   height: 54px;
//   padding-inline: 1rem;
// `;

// export const UnList = styled.ul`
//   padding: 0;
//   display: flex;
//   gap: 40px;
//   align-items: center;
//   text-decoration: none;
//   list-style: none;
// `;

export const CartButton = styled.button`
  width: 32px;
  height: 32px;
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

  &:hover {
    background-color: #ffdcc0;
    color: #062122;
  }
`;

export const MobileFilters = styled.section<{ $display: boolean }>`
  padding: 1rem;
  width: 100%;
  height: 40px;
  color: var(--on-surface-variant);
  background-color: var(--surface-variant);
  font-weight: bold;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (${deviceWidth.gteLaptop}) {
    display: none;
  }
`;
