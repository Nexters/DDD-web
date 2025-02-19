"use client";

import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "../../../../../tarot/components/TarotInteraction";
import { useState } from "react";

import TarotResultAfterView from "@/tarot/components/TarotResultAfterView";

import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useParams } from "next/navigation";
import TarotResultHeader from "@/tarot/components/TarotResultHeader";

export default function TarotReadingResultPage() {
  const { resultId } = useParams();
  const [tarotInteraction, setTarotInteraction] = useState(true);
  const { data, isLoading } = useTarotReadingResult(Number(resultId));

  return (
    <>
      {!tarotInteraction && <TarotResultHeader />}
      <MainContent>
        {tarotInteraction || isLoading ? (
          <TarotInteraction setTarotInteraction={setTarotInteraction} tarotId={data?.tarot} />
        ) : (
          <TarotResultAfterView />
        )}
      </MainContent>
    </>
  );
}
