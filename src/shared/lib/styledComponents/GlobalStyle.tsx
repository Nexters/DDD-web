"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  height: 100%;
}

body {
  height: 100%;
  word-break: break-all;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

button{
  padding: 0;
  border:none;
  background:none;

  cursor: pointer;
}

a,a:link,a:visited{
  text-decoration: none; 
  color:inherit
}
a:active, a:hover{text-decoration:none; }
`;

export default GlobalStyle;
