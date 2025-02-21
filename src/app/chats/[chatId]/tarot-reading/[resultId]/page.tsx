// import { Metadata } from "next";

import TarotReadingResultClient from "@/tarot/components/TarotReadingResultClient";
// export const generateMetadata = (): Metadata => {
//   return {
//     title: "타로냥 - AI 타로로 보는 오늘의 운세, 무료 타로 상담",
//     description: "고양이 타로술사 타로냥이 당신의 질문에 답해주는 AI 타로 서비스입니다.",
//     openGraph: {
//       title: "타로냥 - AI 타로로 보는 오늘의 운세, 무료 타로 상담",
//       description: "고양이 타로술사 타로냥이 당신의 질문에 답해주는 AI 타로 서비스입니다.",
//       images: [
//         {
//           url: "/opengraph-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: "Tarot Reading Result",
//         },
//       ],
//     },
//   };
// };

export default function TarotReadingResultPage({ params }: { params: { resultId: string } }) {
  return <TarotReadingResultClient resultId={params.resultId} />;
}
