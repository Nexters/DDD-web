import SUIT from '@/shared/assets/font/font';
import Hotjar from '@/shared/components/Hotjar';
import ResponsiveRootLayout from '@/shared/components/ResponsiveRootLayout';
import ReactQueryClientProvider from '@/shared/lib/reactQuery/ReactQueryClientProvider';
import GlobalStyle from '@/shared/lib/styledComponents/GlobalStyle';
import StyledComponentsRegistry from '@/shared/lib/styledComponents/StyledComponentsRegistry';
import StyledComponentsTheme from '@/shared/lib/styledComponents/StyledComponentsTheme';
import StyledReset from '@/shared/lib/styledComponents/StyledReset';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
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
            <StyledComponentsTheme>
              <ResponsiveRootLayout>{children}</ResponsiveRootLayout>
            </StyledComponentsTheme>
          </StyledComponentsRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
      <Hotjar />
      <GoogleAnalytics gaId="G-P0MWP9K8K8" />
      <GoogleTagManager gtmId="GTM-5VR9NG96" />
    </html>
  );
}
