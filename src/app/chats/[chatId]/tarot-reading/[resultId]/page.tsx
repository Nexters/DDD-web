"use client";

import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "./components/TarotInteraction";
import TarotResult from "./components/TarotResult";
import { useState } from "react";
import ChatHeader from "@/chat/components/ChatHeader";

import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useParams } from "next/navigation";
export default function TarotReadingResultPage() {
  const { resultId } = useParams();
  const [tarotInteractation, setTarotInteractation] = useState(true);

  console.log(resultId);
  const { data, isLoading } = useTarotReadingResult(Number(resultId));

  console.log(data);

  return (
    <>
      {!tarotInteractation && <ChatHeader />}
      <MainContent>
        {tarotInteractation || isLoading ? (
          <TarotInteraction setTarotInteractation={setTarotInteractation} />
        ) : (
          <TarotResult />
        )}
      </MainContent>
    </>
  );
}
