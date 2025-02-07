"use client";

import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "@/tarot/components/TarotInteraction";
import TarotResult from "@/tarot/components/TarotResult";
import { useState } from "react";
import ChatHeader from "@/chat/components/ChatHeader";
import TarotResultC from "@/tarot/components/TarotResultC";
import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useParams } from "next/navigation";
export default function TarotReadingResultPage() {
  const { resultId } = useParams();
  const [tarotInteractation, setTarotInteractation] = useState(true);
  const { data, isLoading } = useTarotReadingResult(Number(resultId));

  return (
    <>
      {!tarotInteractation && <ChatHeader />}
      <MainContent>
        {tarotInteractation || isLoading ? (
          <TarotInteraction setTarotInteractation={setTarotInteractation} tarotId={data?.tarot} />
        ) : (
          <TarotResult />
        )}
      </MainContent>
    </>
  );
}
