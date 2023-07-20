import { Link } from "@tanstack/router";
import Sidebar from "../sidebar/Sidebar.component";
import styled from "styled-components";
import useCurrentUser from "../../hooks/useAuthStateChange";

const SidemenuContainer = styled.section`
  margin: 3.5rem 1rem 5rem;
  padding: 1rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
  text-align: start;

  font-size: larger;
`;

type SidemenuProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const Sidemenu = ({ sidebar, closeSidebar }: SidemenuProps) => {
  const currentUser = useCurrentUser();

  return (
    <Sidebar sidebar={sidebar} index={5} closeSidebar={closeSidebar}>
      <SidemenuContainer onClick={closeSidebar}>
        <Link to="/store/$for" params={{ for: "men" }}>
          Men
        </Link>
        <Link to="/store/$for" params={{ for: "women" }}>
          Women
        </Link>
        <Link to="/store/$for" params={{ for: "kids" }}>
          Kids
        </Link>
        <Link to="/explore">Explore</Link>
        {currentUser ? (
          <Link
            params={{ userId: `${currentUser.email}` }}
            to="/user/$userId/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <Link to="/seller-registration">Seller Register</Link>
        )}
      </SidemenuContainer>
    </Sidebar>
  );
};

export default Sidemenu;
