"use client";

import HeaderContent from "@/shared/components/HeaderContent";
import HistoryBackButton from "@/shared/components/HistoryBackButton";
import MainContent from "@/shared/components/MainContent";

import TarotResults from "@/tarot/components/TarotResults";
import { css } from "styled-components";
export default function TarotReadingResultsPage() {
  return (
    <>
      <HeaderContent sticky divider startAction={<HistoryBackButton />}>
        <p
          css={css`
            ${({ theme }) => theme.fonts.subHead3};
          `}
        >
          지난 결과 모아보기
        </p>
      </HeaderContent>
      <MainContent>
        <TarotResults />
      </MainContent>
    </>
  );
}
