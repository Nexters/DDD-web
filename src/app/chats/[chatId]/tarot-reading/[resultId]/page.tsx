"use client";

import HeaderContent from "@/shared/components/HeaderContent";
import MainContent from "@/shared/components/MainContent";
import TarotInteraction from "./components/TarotInteraction";
import TarotResult from "./components/TarotResult";
import { useState } from "react";
export default function TarotReadingResultPage() {
  const [tarotInteractation, setTarotInteractation] = useState(true);
  return (
    <>
      <HeaderContent>{null}</HeaderContent>
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
