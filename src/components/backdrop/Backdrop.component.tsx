import styled from "styled-components";

export const BackdropContainer = styled.div<{ $open: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: rgb(6, 33, 34, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

type BackdropProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const Backdrop = ({ sidebar, closeSidebar }: BackdropProps) => {
  return <BackdropContainer $open={sidebar} onClick={closeSidebar} />;
};

export default Backdrop;
