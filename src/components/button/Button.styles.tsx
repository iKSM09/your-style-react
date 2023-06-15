import styled from "styled-components";

type Varients = {
  $color?: "primary" | "secondary" | null;
  $outlined?: boolean;
  $radius?: "full" | "curved";
  // type?: "submit";
};

// const colors = {
//   primary: {
//     bg: "#1f383a",
//     text: "#ffffff",
//   },
//   secondary: {
//     bg: "#ffdcc0",
//     text: "#f93889",
//   },
// };

export const Button = styled.button<Varients>`
  cursor: pointer;

  padding: 0.7rem 2rem;
  font-size: 1rem;
  background-color: ${({ $color }) => {
    if ($color === "primary") return "#1f383a";
    if ($color === "secondary") return "#ffdcc0";
    return "transparent";
  }};
  color: ${({ $color }) => {
    if ($color === "primary") return "#ffffff";
    if ($color === "secondary") return "#f93889";
    return "#1f383a";
  }};
  border: ${({ $outlined }) => ($outlined ? "solid 2px #1f383a" : "none")};
  border-radius: ${({ $radius }) => {
    if ($radius === "full") return "50px";
    if ($radius === "curved") return "12px";
    return "none";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
