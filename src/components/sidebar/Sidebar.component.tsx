import { ReactNode } from "react";
import styled from "styled-components";
import useSidebar from "../../hooks/useSidebar";

export const SidebarSection = styled.section`
  /* .animate {
    height: 100px;
    width: 100px;
    background-color: #c00;
    transition: all 1s ease;
    position: absolute;
    cursor: pointer;
    font: 13px/100px sans-serif;
    color: white;
    text-align: center;
  } */

  /* ↓ just to position things  */
  /* .animate.left {
    left: 0;
    top: 50%;
    margin-top: -100px;
  }
  .animate.right {
    right: 0;
    top: 50%;
  }
  .animate.top {
    top: 0;
    left: 50%;
  }
  .animate.bottom {
    bottom: 0;
    left: 50%;
    margin-left: -100px;
  }

  .animate.left.move {
    left: 100%;
    transform: translate(-100%, 0);
  }

  .animate.right.move {
    right: 100%;
    transform: translate(100%, 0);
  }

  .animate.top.move {
    top: 100%;
    transform: translate(0, -100%);
  }

  .animate.bottom.move {
    bottom: 100%;
    transform: translate(0, 100%);
  } */
`;

export const SidebarContainer = styled.div<{
  $open: boolean;
  $index?: number;
  $position?: "left" | "right";
}>`
  position: fixed;
  inset-block: 0;
  ${({ $position = "left" }) =>
    $position == "left" ? "left: 0;" : "right: 0;"}
  isolation: isolate;
  z-index: ${({ $index = 20 }) => $index + 1};
  translate: ${({ $open, $position = "left" }) =>
    $open ? "0%" : $position == "left" ? "-100%" : "100%"};
  transition: all 0.4s;

  width: min(100vw, 425px);
  height: 100vh;

  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
`;

export const Backdrop = styled.div<{ $open: boolean; $index?: number }>`
  position: fixed;
  inset: 0 0 0;
  z-index: ${({ $index = 20 }) => $index};

  width: 100%;
  height: 100vh;
  background-color: rgb(6, 33, 34, 0.85);

  display: ${({ $open }) => ($open ? "block" : "none")};
`;

type SidebarProps = {
  children: ReactNode;
  index?: number;
  position?: "left" | "right";
  sidebar: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({
  children,
  index,
  position,
  sidebar,
  closeSidebar,
}: SidebarProps) => {
  return (
    <SidebarSection>
      <SidebarContainer $open={sidebar} $index={index} $position={position}>
        {children}
      </SidebarContainer>
      <Backdrop $open={sidebar} $index={index} onClick={closeSidebar} />
    </SidebarSection>
  );
};

export default Sidebar;
