import { Link, useParams } from "@tanstack/router";

import Logo from "../logo/Logo.component";
import SearchBar from "../search-bar/SearchBar.component";

import {
  MdFilterList,
  MdMenu,
  MdMenuOpen,
  MdOutlineShoppingCart,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import Dropdown from "../dropdown/Dropdown.component";
import {
  CartButton,
  LogoContainer,
  LowerNavContainer,
  MobileFilters,
  NavContainer,
  NavMainContent,
  UpperNavContainer,
} from "./Navigation.styles";
import { Button } from "../button/Button.styles";
import { productListRoute } from "../../pages/product-list/ProductList.page";
import { userSignOut } from "../../utils/firebase/auth.firebase";
import useCurrentUser from "../../hooks/useAuthStateChange";

type NavigationProps = {
  openModal: () => void;
  openCart: () => void;
  sidemenu: boolean;
  toggleSidemenu: () => void;
  openFilterMenu: () => void;
};

const Navigation = ({
  openModal,
  openCart,
  sidemenu,
  toggleSidemenu,
  openFilterMenu,
}: NavigationProps) => {
  const currentUser = useCurrentUser();
  console.log(currentUser);

  const params = useParams({
    from: productListRoute.id,
  });

  return (
    <NavContainer>
      <UpperNavContainer>
        <small>This season biggest sale - Up to 60% off</small>
        <ul>
          <li>
            {currentUser ? (
              <Link
                to="/user/$userId/dashboard"
                params={{ userId: `${currentUser.email}` }}
              >
                <small>Dashboard</small>
              </Link>
            ) : (
              <Link to="/seller-registration">
                <small>Seller Register</small>
              </Link>
            )}
          </li>
          <li>
            <small>
              <Dropdown
                defaultOption="INR"
                options={["INR", "USD"]}
                title="Select Currency"
              />
            </small>
          </li>
          <li>
            <small>
              <Dropdown
                defaultOption="English"
                options={["English", "Hindi", "Marathi", "Tamil"]}
                title="Select Language"
              />
            </small>
          </li>
        </ul>
      </UpperNavContainer>
      <LowerNavContainer>
        <LogoContainer>
          <span onClick={toggleSidemenu} className="mobile-only">
            {sidemenu ? (
              <MdMenuOpen
                title="Menu Opened"
                size="32px"
                color="var(--on-surface)"
                className="menu"
              />
            ) : (
              <MdMenu
                title="Menu"
                size="32px"
                color="var(--on-surface)"
                className="menu"
              />
            )}
          </span>
          <Logo />
        </LogoContainer>
        <NavMainContent>
          <Link
            to="/store/$for"
            params={{ for: "men" }}
            className="hide-from-mobile"
          >
            Men
          </Link>
          <Link
            to="/store/$for"
            params={{ for: "women" }}
            className="hide-from-mobile"
          >
            Women
          </Link>
          <Link
            to="/store/$for"
            params={{ for: "kids" }}
            className="hide-from-mobile"
          >
            Kids
          </Link>
          <Link to="/explore" className="laptop-only">
            Explore
          </Link>
          <span className="laptop-only">
            <SearchBar />
          </span>
          <CartButton onClick={openCart} className="laptop-only">
            <MdOutlineShoppingCart size="20px" />
          </CartButton>
          {currentUser && (
            <Link
              to="/user/$userId/feed"
              params={{ userId: `${currentUser?.email}` }}
              className="hide-from-tablet"
            >
              <MdPerson size="26px" />
            </Link>
          )}
          {currentUser ? (
            <Button
              $outlined
              onClick={userSignOut}
              className="hide-from-mobile"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              $color="secondary"
              $radius="curved"
              onClick={openModal}
              className="hide-from-mobile"
            >
              Login
            </Button>
          )}
          <MdSettings size="28px" className="mobile-only" />
        </NavMainContent>
      </LowerNavContainer>
      {params.for && !sidemenu && (
        <MobileFilters onClick={openFilterMenu} $display={sidemenu}>
          <p>Apply Filters</p>
          <MdFilterList size="28" />
        </MobileFilters>
      )}
    </NavContainer>
  );
};

export default Navigation;
