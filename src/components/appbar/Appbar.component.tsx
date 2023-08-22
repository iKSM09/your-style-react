import { Link } from "@tanstack/router";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

import { AppbarContainer } from "./Appbar.styles";
import useCurrentUser from "../../hooks/useAuthStateChange";
import Icon from "../_ui/button/Icon.components";

type AppbarProps = {
  openCart: () => void;
};

const Appbar = ({ openCart }: AppbarProps) => {
  const user = useCurrentUser();

  return (
    <AppbarContainer>
      <Link to="/">
        <Icon.Home size={32} $ghosted $highlight />
      </Link>
      <Link to="/explore">
        <Icon.Search size={32} $ghosted $highlight />
      </Link>
      <Link to="/user/$userId/add-post" params={{ userId: `${user?.email}` }}>
        <Icon.AddPost size={32} $ghosted $highlight />
      </Link>
      <Icon.Cart size={32} $ghosted $highlight onClick={openCart} />
      <Link to="/user/$userId/feed" params={{ userId: `${user?.email}` }}>
        <Icon.User size={32} $ghosted $highlight />
      </Link>
    </AppbarContainer>
  );
};

export default Appbar;
