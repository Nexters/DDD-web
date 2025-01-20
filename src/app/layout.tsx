"use client";
import SUIT from "@/shared/assets/font/font";
import ReactQueryClientProvider from "@/shared/lib/reactQuery/ReactQueryClientProvider";
import StyledComponentsRegistry from "@/shared/lib/styledComponents/StyledComponentsRegistry";
import StyledReset from "@/shared/lib/styledComponents/StyledReset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./global.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../shared/lib/styledComponents/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={SUIT.className}>
      <body>
        <ReactQueryClientProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <StyledReset />
              {children}
            </ThemeProvider>
          </StyledComponentsRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
