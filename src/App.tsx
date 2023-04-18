import Home from "./pages/Home.page";

import { AppContainer } from "./styles/App.styles";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Home />
    </AppContainer>
  );
}

export default App;
