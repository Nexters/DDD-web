import SUIT from '@/shared/assets/font/font';
import ResponsiveRootLayout from '@/shared/components/ResponsiveRootLayout';
import ReactQueryClientProvider from '@/shared/lib/reactQuery/ReactQueryClientProvider';
import GlobalStyle from '@/shared/lib/styledComponents/GlobalStyle';
import StyledComponentsRegistry from '@/shared/lib/styledComponents/StyledComponentsRegistry';
import StyledReset from '@/shared/lib/styledComponents/StyledReset';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
            <StyledReset />
            <GlobalStyle />
            <ResponsiveRootLayout>{children}</ResponsiveRootLayout>
          </StyledComponentsRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
