import { useState } from "react";
import { Outlet } from "@tanstack/router";

import Navigation from "./components/navigation/Navigation.component";
import Cart from "./components/cart/Cart.component";

import Footer from "./components/footer/Footer.component";

import { GlobalStyles } from "./styles/GlobalStyles";
import { AppContainer } from "./styles/App.styles";
import UserAuth from "./components/auth/UserAuth.component";

import Appbar from "./components/appbar/Appbar.component";

import Sidemenu from "./components/sidemenu/Sidemenu.component";
import useSidebar from "./hooks/useSidebar";
import FilterMenuSidebar from "./components/filter-menu/FilterMenuSidebar.component";
import UserPost from "./components/user-post/UserPost.component";

function App() {
  const [cart, openCart, closeCart] = useSidebar();
  const [sidemenu, openSidemenu, closeSidemenu, toggleSidemenu] = useSidebar();
  const [filterMenu, openFilterMenu, closeFilterMenu] = useSidebar();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((bool) => !bool);
  const closeModal = () => setModalOpen(false);

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

      <UserAuth closeOnOutsideClick />

      <Cart sidebar={cart} closeSidebar={closeCart} />
      <Sidemenu sidebar={sidemenu} closeSidebar={closeSidemenu} />

      <Footer />
    </AppContainer>
  );
}

export default App;
