"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

import React, { ReactNode } from "react";

const StyledComponentsTheme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledComponentsTheme;
