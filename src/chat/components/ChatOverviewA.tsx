/// ChatOverview

"use client";

import QuickQuestionPickerBox from "@/chat/components/QuickQuestionPickerBox";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import { css } from "styled-components";
import TextFieldInChatOverview from "./TextFieldInChatOverview";

export default function ChatOverviewA() {
  return (
    <MainContent>
      <div
        css={css`
          flex: 1;
        `}
      >
        <h1
          css={css`
            margin-top: 170px;
            text-align: center;
            ${(props) => props.theme.fonts.headline2}
          `}
        >
          AI 타로 술사, 타로냥에게
          <br /> 무엇이든 물어봐라냥
        </h1>
        <div
          css={css`
            margin-top: 32px;
          `}
        >
          <QuickQuestionPickerBox />
        </div>
      </div>
      <div>
        <FullscreenOverflowDivider />
        <div
          css={css`
            padding: 16px 20px;
          `}
        >
          <TextFieldInChatOverview />
        </div>
      </div>
    </MainContent>
  );
}
