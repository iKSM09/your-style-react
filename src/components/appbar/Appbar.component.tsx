import { Link } from "@tanstack/router";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

import { AppbarContainer } from "./Appbar.styles";
import useSidebar from "../../hooks/useSidebar";
import useCurrentUser from "../../hooks/useAuthStateChange";

type AppbarProps = {
  openModal: () => void;
  openCart: () => void;
};

const Appbar = ({ openModal, openCart }: AppbarProps) => {
  const user = useCurrentUser();

  return (
    <AppbarContainer>
      <Link to="/">
        <MdHome size="32px" />
      </Link>
      <Link to="/explore">
        <MdSearch size="32px" />
      </Link>
      <Link to="/user/$userId/add-post" params={{ userId: `${user?.email}` }}>
        <IoMdAddCircleOutline size="32px" />
      </Link>
      <MdOutlineShoppingCart size="32px" onClick={openCart} />
      <Link to="/user/$userId/feed" params={{ userId: `${user?.email}` }}>
        <MdPerson size="32px" />
      </Link>
    </AppbarContainer>
  );
};

export default Appbar;
