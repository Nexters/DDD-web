import { css } from "styled-components";

export default function ChatAvatar() {
  // TODO: 이미지로 교체
  return (
    <div
      css={css`
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.grey10};
        border: 1px solid ${({ theme }) => theme.colors.grey20};
      `}
    />
  );
}
