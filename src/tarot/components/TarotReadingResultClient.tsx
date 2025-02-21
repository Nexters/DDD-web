"use client";

import { useState } from "react";

import TarotInteraction from "./TarotInteraction";
import TarotResultAfterView from "@/tarot/components/TarotResultAfterView";
import TarotResultHeader from "@/tarot/components/TarotResultHeader";
import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";

export default function TarotReadingResultClient({ resultId }: { resultId: string }) {
  const [tarotInteraction, setTarotInteraction] = useState(true);
  const { data, isLoading } = useTarotReadingResult(Number(resultId));

  return (
    <>
      {!tarotInteraction && <TarotResultHeader />}

      {tarotInteraction || isLoading ? (
        <TarotInteraction setTarotInteraction={setTarotInteraction} tarotId={data?.tarot} />
      ) : (
        <TarotResultAfterView />
      )}
    </>
  );
}
