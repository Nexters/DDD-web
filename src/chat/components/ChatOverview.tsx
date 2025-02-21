"use client";

import QuickQuestionPickerBox from "@/chat/components/QuickQuestionPickerBox";
import tarotCatAnimation from "@/shared/assets/lotties/home-cat-cardpicker.json";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import dynamic from "next/dynamic";
import { css } from "styled-components";
import TextFieldInChatOverview from "./TextFieldInChatOverview";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div style={{ width: 300, height: 300 }} />,
});

export default function ChatOverview() {
  return (
    <MainContent>
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 90px;
          `}
        >
          <div
            css={css`
              width: 100%;
              max-width: 600px;
              margin-inline: auto;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                margin-top: 28px;
              `}
            >
              <Lottie animationData={tarotCatAnimation} loop={true} style={{ height: 300 }} />
            </div>
            <h1
              css={css`
                text-align: center;
                margin-top: 5px;
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
                width: 100%;
                max-width: 600px;
                margin-inline: auto;
              `}
            >
              <TextFieldInChatOverview />
            </div>
          </div>{" "}
        </div>
      </div>
    </MainContent>
  );
}
