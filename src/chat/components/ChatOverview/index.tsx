'use client';

import QuickQuestionPickerBox from '@/chat/components/QuickQuestionPickerBox';
import MainContent from '@/shared/components/MainContent';
import { css } from 'styled-components';

export default function ChatOverview() {
  return (
    <MainContent>
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
    </MainContent>
  );
}
