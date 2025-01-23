'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  word-break: break-all;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

@media screen and (min-width: 450px) {
  body {
    background-color: rgb(245, 245, 245);
  }
}
`;

export default GlobalStyle;
