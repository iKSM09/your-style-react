import styled from "styled-components";
import { Header } from "../../pages/product-list/ProductList.styles";

export const FilterMenuContainer = styled.aside`
  margin-inline: 1rem;
`;

export const FilterMenuHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterSection = styled.section`
  margin-bottom: 0.5rem;
`;

export const CheckList = styled.div`
  --form-control-color: rebeccapurple;
  --form-control-disabled: #959495;

  /* padding: 0 1rem 1rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CheckListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    margin: 0;
    padding: 0;
  }

  input[type="checkbox"] {
    /* all: unset; */
    margin: 0;
    height: 1.2rem;
    width: 1.2rem;
    color: var(--outlined);
    background-color: var(--form-background);
    font: inherit;
    appearance: none;

    border: 0.12rem solid currentColor;
    border-radius: 0.12rem;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    ::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
    }

    :checked::before {
      transform: scale(1);
    }

    :focus {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }

    :disabled {
      --form-control-color: var(--form-control-disabled);
      color: var(--form-control-disabled);
      cursor: not-allowed;
    }
  }
`;
