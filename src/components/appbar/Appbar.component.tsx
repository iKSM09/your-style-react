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

type AppbarProps = {
  openModal: () => void;
  openCart: () => void;
};

const Appbar = ({ openModal, openCart }: AppbarProps) => {
  return (
    <AppbarContainer>
      <Link to="/">
        <MdHome size="32px" />
      </Link>
      <Link to="/explore">
        <MdSearch size="32px" />
      </Link>
      <IoMdAddCircleOutline size="32px" />
      <MdOutlineShoppingCart size="32px" onClick={openCart} />
      <MdPerson size="32px" onClick={openModal} />
    </AppbarContainer>
  );
};

export default Appbar;
