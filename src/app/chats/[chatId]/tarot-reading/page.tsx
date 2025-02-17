import HeaderContent from "@/shared/components/HeaderContent";
import HistoryBackButton from "@/shared/components/HistoryBackButton";
import MainContent from "@/shared/components/MainContent";

import TarotResults from "@/tarot/components/TarotResults";

export default async function TarotReadingResultsPage() {
  return (
    <>
      <HeaderContent sticky divider startAction={<HistoryBackButton />}>
        지난 결과 모아보기
      </HeaderContent>
      <MainContent>
        <TarotResults />
      </MainContent>
    </>
  );
}
