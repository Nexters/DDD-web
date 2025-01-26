import SUIT from '@/shared/assets/font/font';
import Hotjar from '@/shared/components/Hotjar';
import ReactQueryClientProvider from '@/shared/lib/reactQuery/ReactQueryClientProvider';
import StyledComponentsRegistry from '@/shared/lib/styledComponents/StyledComponentsRegistry';
import StyledReset from '@/shared/lib/styledComponents/StyledReset';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './global.css';

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
            {children}
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
