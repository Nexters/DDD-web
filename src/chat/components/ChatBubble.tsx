import { MessageSenderType } from "@/chat/types/messageSender";
import { TarotCardIdType } from "@/tarot/types/tarotCardId";
import findCardById from "@/tarot/utils/findCardById";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  cardId?: TarotCardIdType;
  resultId?: number;
  loading?: boolean;
};
// TODO: 말풍선 컴포넌트 리팩터
export default function ChatBubble({ sender, message, cardId, resultId, loading }: Props) {
  const theme = useTheme();
  const { chatId } = useParams<{ chatId: string }>();

  // if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");

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

  if (cardId && chatId) {
    const card = findCardById(cardId);

    return (
      <Link
        href={`/chats/${chatId}/tarot-reading/${resultId}`}
        css={css`
          width: fit-content;
        `}
      >
        <Image
          src={card.imgSrc}
          alt={card.alt}
          width={100}
          height={160}
          css={css`
            background-color: ${({ theme }) => theme.colors.grey50};
            border-radius: 8px;
          `}
        />
      </Link>
    );
  }

  return (
    <div
      css={css`
        padding: 8px 12px;
        background-color: ${({ theme }) => theme.colors.grey10};
        ${({ theme }) => theme.fonts.body3}
        border-radius: 8px;
        width: fit-content;
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
