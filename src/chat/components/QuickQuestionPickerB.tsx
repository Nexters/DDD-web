import { ColorsTypes } from "@/shared/lib/styledComponents/theme";
import { css, useTheme } from "styled-components";
type Props = {
  question: string;
  onClick: () => void;
  selectedCount: number;
  color: keyof Pick<ColorsTypes, "primary03" | "primary01" | "grey10" | "grey60">;
};

export default function QuickQuestionPickerB({ question, onClick, selectedCount, color }: Props) {
  const theme = useTheme();
  const formattedSelectedCount = selectedCount.toLocaleString();

  const componentTheme = (() => {
    switch (color) {
      case "primary03":
      case "grey60":
        return {
          backgroundColor: theme.colors[color],
          titleColor: theme.colors.white,
          captionColor: theme.colors.grey10,
        };
      case "primary01":
      case "grey10":
        return {
          backgroundColor: theme.colors[color],
          titleColor: theme.colors.grey70,
          captionColor: theme.colors.grey60,
        };

      default:
        const _exhausted: never = color;
        throw new Error(`처리되지 않은 색상 타입입니다. ${_exhausted}`);
    }
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        min-height: 94px;
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        background-color: ${componentTheme.backgroundColor};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        cursor: pointer;
        width: 164px;
        flex-shrink: 0;
      `}
    >
      <p
        css={css`
          ${theme.fonts.subHead3}
          color: ${componentTheme.titleColor};
        `}
      >
        {question}
      </p>
      <p
        css={css`
          ${theme.fonts.caption}
          color: ${componentTheme.captionColor};
        `}
      >{`${formattedSelectedCount}명이 질문 중`}</p>
    </button>
  );
}
