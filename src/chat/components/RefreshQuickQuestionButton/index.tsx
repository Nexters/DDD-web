import { useQueryClient } from '@tanstack/react-query';
import { css } from 'styled-components';

export default function RefreshQuickQuestionButton() {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ['tarotQuestionRecommends'] });
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
      {/* TODO: 아이콘 추가 */}
    </button>
  );
}
