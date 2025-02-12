"use client";

import QuickQuestionPickerBox from "@/chat/components/QuickQuestionPickerBox";
import TarotCatImage from "@/shared/assets/images/tarot-cat.png";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import Image from "next/image";
import { css } from "styled-components";
import TextFieldInChatOverview from "./TextFieldInChatOverview";

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
              <Image
                src={TarotCatImage}
                alt=""
                css={css`
                  display: block;
                `}
                height={213}
                priority
              />
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
