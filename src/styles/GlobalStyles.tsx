import { createGlobalStyle } from "styled-components";
import ReseterCSS from "./ReseterCSS";
import { deviceWidth } from "./devices.breakpoints";

export const GlobalStyles = createGlobalStyle`
${ReseterCSS}

:root {
  --primary: #3753cb; /* #1e484b */
  --on-primary: #ffffff;
  --primary-container: #dde1ff;
  --on-primary-container: #001257;

  --secondary: #5a5d72;
  --on-secondary: #ffffff;
  --secondary-container: #dfe1f9;
  --on-secondary-container: #171b2c;

  --tertiary: #76546e;
  --on-tertiary: #ffffff;
  --tertiary-container: #ffd7f2;
  --on-tertiary-container: #2d1228;

  --error: #ba1a1a;
  --on-error: #ffffff;
  --error-container: #ffdad6;
  --on-error-container: #410002;

  --bg: #fefbff;
  --on-bg: #1b1b1f;
  --outline: #767680;
  --surface: #fefbff;
  --on-surface: #1b1b1f;
  --surface-variant: #e3e1ec;
  --on-surface-variant: #45464f;

  --success: #006b55;
  --on-success: #ffffff;
  --success-container: #7ff8d3;
  --on-success-container: #002018;

  --warning: #845400;
  --on-warning: #ffffff;
  --warning-container: #ffddb6;
  --on-warning-container: #2a1800;

  --info: #00668a;
  --on-info: #ffffff;
  --info-container: #c4e7ff;
  --on-info-container: #001e2c;

  --brand01: #984714;
  --on-brand01: #ffffff;
  --brand01-container: #ffdbca;
  --on-brand01-container: #331100;

  --brand02: #b20088;
  --on-brand02: #ffffff;
  --brand02-container: #ffd8eb;
  --on-brand02-container: #3c002c;




  --border-curved: 12px;
  --border-full: 180px;


  font-family: "Schibsted Grotesk", system-ui, Avenir, Helvetica, Arial, sans-serif;

  color: var(--on-bg);
  background-color: var(--bg);
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary: #b9c3ff;
    --on-primary: #00228a;
    --primary-container: #1738b2;
    --on-primary-container: #dde1ff;

    --secondary: #c3c5dd;
    --on-secondary: #2c2f42;
    --secondary-container: #434659;
    --on-secondary-container: #dfe1f9;

    --tertiary: #e5bad8;
    --on-tertiary: #44263e;
    --tertiary-container: #5c3c55;
    --on-tertiary-container: #ffd7f2;

    --error: #ffb4ab;
    --on-error: #690005;
    --error-container: #93000a;
    --on-error-container: #ffdad6;

    --bg: #1b1b1f;
    --on-bg: #e4e1e6;
    --outline: #90909a;
    --surface: #1b1b1f;
    --on-surface: #e4e1e6;
    --surface-variant: #45464f;
    --on-surface-variant: #c6c5d0;

    --success: #60dbb8;
    --on-success: #00382b;
    --success-container: #005140;
    --on-success-container: #7ff8d3;

    --warning: #ffb95b;
    --on-warning: #462a00;
    --warning-container: #643f00;
    --on-warning-container: #ffddb6;

    --info: #7bd0ff;
    --on-info: #00354a;
    --info-container: #004c69;
    --on-info-container: #c4e7ff;

    --brand01: #ffb690;
    --on-brand01: #542100;
    --brand01-container: #783200;
    --on-brand01-container: #ffdbca;

    --brand02: #ffaedc;
    --on-brand02: #610049;
    --brand02-container: #880068;
    --on-brand02-container: #ffd8eb;
  }
}

.mobile-only { // only visible on mobile
  @media screen and (${deviceWidth.gteTablet}) {
    display: none;
  }
}

.tablet-only { // only visible on tablet
  @media screen and (${deviceWidth.lteMobileL}) {
    display: none;
  }

  @media screen and (${deviceWidth.gteLaptop}) {
    display: none;
  }
}

.laptop-only { // only visible on laptop & desktop
  @media screen and (${deviceWidth.ltLaptop}) {
    display: none;
  }
}

.hide-from-mobile {
  @media screen and (${deviceWidth.approxMobile}) {
    display: none;
  }
}

.hide-from-tablet {
  @media screen and (${deviceWidth.approxTablet}) {
    display: none;
  }
}

.hide-from-laptop {
  @media screen and (${deviceWidth.approxLaptop}) {
    display: none;
  }
}


a {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

`;

/* :root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

span {
  line-height: 0;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
} */
