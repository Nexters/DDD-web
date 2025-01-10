import ReactQueryClientProvider from '@/shared/lib/reactQuery/ReactQueryClientProvider';
import StyledComponentsRegistry from '@/shared/lib/styledComponents/StyledComponentsRegistry';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryClientProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry> <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
