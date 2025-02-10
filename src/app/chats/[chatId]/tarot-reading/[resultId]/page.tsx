"use client";

import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "../../../../../tarot/components/TarotInteraction";
import TarotResult from "../../../../../tarot/components/TarotResult";
import { useState } from "react";
import ChatHeader from "@/chat/components/ChatHeader";

import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useParams } from "next/navigation";
export default function TarotReadingResultPage() {
  const { resultId } = useParams();
  const [tarotInteraction, setTarotInteraction] = useState(true);
  const { data, isLoading } = useTarotReadingResult(Number(resultId));

  return (
    <>
      {!tarotInteraction && <ChatHeader />}
      <MainContent>
        {tarotInteraction || isLoading ? (
          <TarotInteraction setTarotInteraction={setTarotInteraction} tarotId={data?.tarot} />
        ) : (
          <TarotResult />
        )}
      </MainContent>
    </>
  );
}
