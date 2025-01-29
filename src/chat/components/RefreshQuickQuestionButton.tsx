import RotateIcon from "@/shared/assets/icons/rotate.svg";
import { useQueryClient } from "@tanstack/react-query";
import { css } from "styled-components";
export default function RefreshQuickQuestionButton() {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["tarotQuestionRecommends"] });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      css={css`
        padding: 5px 8px;
        border: none;
        background-color: transparent;
        color: ${(props) => props.theme.colors.grey60};
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      `}
    >
      <span
        css={css`
          ${(props) => props.theme.fonts.body1};
        `}
      >
        추천 질문 변경
      </span>
      <RotateIcon />
    </button>
  );
}
