"use client";

import HeaderContent from "@/shared/components/HeaderContent";
import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "./components/TarotInteraction";
import TarotResult from "./components/TarotResult";
import { useState } from "react";
import ChatHeader from "@/chat/components/ChatHeader";
export default function TarotReadingResultPage() {
  const [tarotInteractation, setTarotInteractation] = useState(true);
  //test
  return (
    <>
      {/* <HeaderContent>{null}</HeaderContent> */}
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
