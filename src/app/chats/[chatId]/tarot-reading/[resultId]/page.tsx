"use client";

import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "./components/TarotInteraction";
import TarotResult from "./components/TarotResult";
import { useState } from "react";
import ChatHeader from "@/chat/components/ChatHeader";
export default function TarotReadingResultPage() {
  const [tarotInteractation, setTarotInteractation] = useState(true);
  return (
    <>
      <ChatHeader />
      <MainContent>
        {tarotInteractation ? (
          <TarotInteraction setTarotInteractation={setTarotInteractation} />
        ) : (
          <TarotResult />
        )}
      </MainContent>
    </>
  );
}
