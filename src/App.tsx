import { Outlet } from "@tanstack/router";

import Navigation from "./components/navigation/Navigation.component";

import { GlobalStyles } from "./styles/GlobalStyles";
import { AppContainer } from "./styles/App.styles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navigation />
      <Outlet />
      <footer>copyright @yourStyle2023</footer>
    </AppContainer>
  );
}

export default App;
