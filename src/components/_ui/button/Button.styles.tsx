import styled from "styled-components";

export type ButttonVarientsProps = {
  type?: string;
  $secondary?: boolean;
  $outlined?: boolean;
  $ghosted?: boolean;
  $curved?: boolean;
  $pilled?: boolean;
  $highlight?: boolean;
};

export type StyledIconProps = {
  $reversed?: boolean;
};

const ButtonVarients = styled.button<ButttonVarientsProps>`
  color: ${({ $secondary, $outlined, $ghosted }) => {
    if ($outlined || $ghosted)
      return $secondary ? "var(--secondary)" : "var(--primary)";
    return $secondary ? "var(--on-secondary)" : "var(--on-primary)";
  }};

  background-color: ${({ $secondary, $outlined, $ghosted }) => {
    if ($outlined || $ghosted) return "transparent";
    return $secondary ? "var(--secondary)" : "var(--primary)";
  }};

  border: ${({ $secondary, $ghosted }) => {
    if ($ghosted) return "solid 2px transparent";
    return $secondary
      ? "solid 2px var(--secondary)"
      : "solid 2px var(--primary)";
  }};

  border-radius: ${({ $curved, $pilled }) => {
    if ($pilled) return "var(--border-rounded)";
    if ($curved) return "var(--border-curved)";
    return "unset";
  }};

  &:hover,
  &:active,
  &:focus {
    color: ${({ $secondary }) =>
      $secondary
        ? "var(--on-secondary-container)"
        : "var(--on-primary-container)"};

    background-color: ${({ $secondary, $highlight }) => {
      if ($highlight) return "transparent";
      return $secondary
        ? "var(--secondary-container)"
        : "var(--primary-container)";
    }};

    border: ${({ $secondary, $highlight }) => {
      if ($highlight) return "transparent";
      return $secondary
        ? "solid 2px var(--secondary-container)"
        : "solid 2px var(--primary-container)";
    }};
  }
`;

export const Button = styled(ButtonVarients)`
  --padding-inline: 0.75rem;

  cursor: pointer;
  padding-inline: var(--padding-inline);
  height: 40px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    color: "var(--on-surface-variant)";
    background-color: "var(--surface-variant)";
  }
`;

export const IconButton = styled(Button)<StyledIconProps>`
  --padding-inline: ${({ $reversed }) =>
    $reversed ? "0.75rem 0.5rem" : "0.5rem 0.75rem"};
  gap: 0.5rem;
`;

export const StyledIcon = styled(Button)`
  --padding-inline: 0;

  min-width: 40px;

  * {
    margin: auto;
  }
`;

export const ButtonSet = styled(ButtonVarients).attrs({ as: "div" })`
  --padding-inline: 0;

  display: flex;
  overflow: hidden;
`;
