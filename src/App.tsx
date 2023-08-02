import { Outlet } from "@tanstack/router";

import Navigation from "./components/navigation/Navigation.component";
import Cart from "./components/cart/Cart.component";

import Footer from "./components/footer/Footer.component";

import { GlobalStyles } from "./styles/GlobalStyles";
import { AppContainer } from "./styles/App.styles";

import Appbar from "./components/appbar/Appbar.component";

import Sidemenu from "./components/sidemenu/Sidemenu.component";
import useSidebar from "./hooks/useSidebar";
import FilterMenuSidebar from "./components/filter-menu/FilterMenuSidebar.component";
import AuthStateDialog from "./components/auth/AuthStateDialog.component";

function App() {
  const [cart, openCart, closeCart] = useSidebar();
  const [sidemenu, openSidemenu, closeSidemenu, toggleSidemenu] = useSidebar();
  const [filterMenu, openFilterMenu, closeFilterMenu] = useSidebar();

  return (
    <AppContainer>
      <GlobalStyles />
      <Navigation
        openCart={openCart}
        sidemenu={sidemenu}
        toggleSidemenu={toggleSidemenu}
        openFilterMenu={openFilterMenu}
      />
      <FilterMenuSidebar sidebar={filterMenu} closeSidebar={closeFilterMenu} />
      <Appbar openCart={openCart} />
      <Outlet />

      <AuthStateDialog closeOnOutsideClick />

      <Cart sidebar={cart} closeSidebar={closeCart} />
      <Sidemenu sidebar={sidemenu} closeSidebar={closeSidemenu} />

      <Footer />
    </AppContainer>
  );
}

export default App;
