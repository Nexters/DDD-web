import SUIT from "@/shared/assets/font/font";
import RootLayoutComponent from "@/shared/components/RootLayout";
import Hotjar from "@/shared/lib/hotjar/Hotjar";
import MixpanelSDKInitializer from "@/shared/lib/mixpanel";
import ReactQueryClientProvider from "@/shared/lib/reactQuery/ReactQueryClientProvider";
import GlobalStyle from "@/shared/lib/styledComponents/GlobalStyle";
import StyledComponentsRegistry from "@/shared/lib/styledComponents/StyledComponentsRegistry";
import StyledComponentsTheme from "@/shared/lib/styledComponents/StyledComponentsTheme";
import StyledReset from "@/shared/lib/styledComponents/StyledReset";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "타로냥 - AI 타로로 보는 오늘의 운세, 무료 타로 상담",
  metadataBase: new URL("https://tarotnyang.me"),
  alternates: {
    canonical: "/",
  },
  description: "고양이 타로술사 타로냥이 당신의 질문에 답해주는 AI 타로 서비스입니다.",
  keywords:
    "AI 타로, 타로냥, 고양이 타로술사, 타로, 온라인 타로, 타로 서비스, 무료 타로, 운세, 타로 리딩",
  openGraph: {
    type: "website",
    url: "https://tarotnyang.me",
    title: "타로냥 - AI 타로로 보는 오늘의 운세, 무료 타로 상담",
    description: "고양이 타로술사 타로냥이 당신의 질문에 답해주는 AI 타로 서비스입니다.",
    siteName: "타로냥",
  },
  verification: {
    google: "ikYIUp-mFFpIihQWL7s56SIKk5-8Xei2oG31qV7TwsQ",
  },
};
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
              <RootLayoutComponent>{children}</RootLayoutComponent>
            </StyledComponentsTheme>
          </StyledComponentsRegistry>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
        <Analytics />
      </body>
      <Hotjar />
      <GoogleAnalytics gaId="G-P0MWP9K8K8" />
      <GoogleTagManager gtmId="GTM-5VR9NG96" />
      <MixpanelSDKInitializer />
    </html>
  );
}
