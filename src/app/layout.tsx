import SUIT from "@/shared/assets/font/font";
import ReactQueryClientProvider from "@/shared/lib/reactQuery/ReactQueryClientProvider";
import StyledComponentsRegistry from "@/shared/lib/styledComponents/StyledComponentsRegistry";
import StyledReset from "@/shared/lib/styledComponents/StyledReset";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./global.css";
import StyledComponentsTheme from "@/shared/lib/styledComponents/StyledComponentsTheme";
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
            <StyledComponentsTheme>
              <StyledReset />
              {children}
            </StyledComponentsTheme>
          </StyledComponentsRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
