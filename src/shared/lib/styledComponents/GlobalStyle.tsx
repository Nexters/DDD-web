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
`;

export default GlobalStyle;
