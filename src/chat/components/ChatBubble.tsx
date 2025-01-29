import { MessageSenderType } from "@/chat/models/messageSender";
import { TarotCardIdType } from "@/tarot/models/tarotCardId";
import styled, { css, keyframes, useTheme } from "styled-components";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

type Props = {
  sender: MessageSenderType;
  message?: string;
  card?: TarotCardIdType;
  loading?: boolean;
};

export default function ChatBubble({ sender, message, card, loading }: Props) {
  const theme = useTheme();

  if (sender === "USER") {
    return (
      <div
        css={css`
          padding: 8px 12px;
          background-color: ${({ theme }) => theme.colors.primary01};
          ${({ theme }) => theme.fonts.body3}
          color: ${({ theme }) => theme.colors.grey90};
          border-radius: 8px;
          max-width: 260px;
          margin-left: auto;
          white-space: pre-wrap;
        `}
      >
        {message}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background-color: ${({ theme }) => theme.colors.grey10};
          border-radius: 8px;
          height: 40px;
          padding-inline: 12px;
          width: fit-content;
        `}
      >
        <Dot $delay={0} $color={theme.colors.primary01} />
        <Dot $delay={0.3} $color={theme.colors.primary02} />
        <Dot $delay={0.6} $color={theme.colors.primary03} />
      </div>
    );
  }

  if (card) {
    return (
      <div // TODO: 이미지로 교체
        css={css`
          background-color: ${({ theme }) => theme.colors.grey50};
          border-radius: 8px;
          width: 100px;
          height: 160px;
        `}
      />
    );
  }

  return (
    <div
      css={css`
        padding: 8px 12px;
        background-color: ${({ theme }) => theme.colors.grey10};
        ${({ theme }) => theme.fonts.body3}
        border-radius: 8px;
        max-width: 260px;
        color: ${({ theme }) => theme.colors.grey90};
        white-space: pre-wrap;
      `}
    >
      {message}
    </div>
  );
}

const Dot = styled.span<{ $delay: number; $color: string }>`
  width: 6px;
  height: 6px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${fadeInOut} 1.5s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;
