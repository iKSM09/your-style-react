import { Outlet } from "@tanstack/router";

import Navigation from "./components/navigation/Navigation.component";
import Footer from "./components/footer/Footer.component";

import { GlobalStyles } from "./styles/GlobalStyles";
import { AppContainer } from "./styles/App.styles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navigation />
      <Outlet />
      <Footer />
    </AppContainer>
  );
}

export default App;
