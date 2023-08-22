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
  LogoContainer,
  LowerNavContainer,
  MobileFilters,
  NavContainer,
  NavMainContent,
  UpperNavContainer,
} from "./Navigation.styles";
import useCurrentUser from "../../hooks/useAuthStateChange";

import { productListRoute } from "../../pages/product-list/ProductList.route";
import UserLogButton from "../_ui/button/UserLogButton.component";
import Icon from "../_ui/button/Icon.components";

type NavigationProps = {
  openCart: () => void;
  sidemenu: boolean;
  toggleSidemenu: () => void;
  openFilterMenu: () => void;
};

const Navigation = ({
  openCart,
  sidemenu,
  toggleSidemenu,
  openFilterMenu,
}: NavigationProps) => {
  const currentUser = useCurrentUser();

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
              <Icon.MenuOpen size="32px" $highlight $ghosted $curved />
            ) : (
              // <MdMenuOpen
              //   title="Menu Opened"
              //
              //   color="var(--on-surface)"
              //   // className="menu"
              // />
              <Icon.Menu size="32px" $highlight $ghosted $curved />
              // <MdMenu
              //   title="Menu"
              //
              //   color="var(--on-surface)"
              //   // className="menu"
              // />
            )}
          </span>
          <Logo />
        </LogoContainer>
        <NavMainContent>
          <div className="nav-links">
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
          </div>
          <span className="laptop-only">
            <SearchBar />
          </span>
          <Icon.Heart size={20} $secondary $curved $ghosted />
          <Icon.Cart
            $secondary
            $curved
            $ghosted
            onClick={openCart}
            className="laptop-only"
          />
          {currentUser && (
            <Link
              to="/user/$userId/feed"
              params={{ userId: `${currentUser?.email}` }}
              className="laptop-only"
            >
              <Icon.User $secondary $ghosted $curved />
            </Link>
          )}
          <Icon.Settings
            size={22}
            $secondary
            $curved
            $ghosted
            className="hide-from-laptop"
          />
          <UserLogButton cssClass="hide-from-mobile" />
        </NavMainContent>
      </LowerNavContainer>
      {params.for && !sidemenu && (
        <MobileFilters onClick={openFilterMenu} $display={sidemenu}>
          <p>Apply Filters</p>
          <Icon.FilterList $ghosted $highlight size={28} />
        </MobileFilters>
      )}
    </NavContainer>
  );
};

export default Navigation;
