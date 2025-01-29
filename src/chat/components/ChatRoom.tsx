"use client";

import AcceptRejectButtons from "@/chat/components/AcceptRejectButtons";
import ChatBubble from "@/chat/components/ChatBubble";
import ChatBubbleStack from "@/chat/components/ChatBubbleGroup";
import TextFieldInChat from "@/chat/components/TextFieldInChat";
import { useChatMessages } from "@/chat/hooks/useChatMessages";
import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { css } from "styled-components";

export default function ChatRoom() {
  const { chatId } = useParams<{ chatId: string }>();
  const { data } = useChatMessages(Number(chatId));
  const { copyServerState, state: messages } = useChatMessagesContext();

  useEffect(() => {
    if (data) {
      copyServerState(data.messages);
    }
  }, [data, copyServerState]);

  if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");
  if (!data) return null;

  const showAcceptRejectButtons = messages[messages.length - 1]?.type === "SYSTEM_TAROT_QUESTION_REPLY";

  return (
    <MainContent>
      <div
        css={css`
          flex: 1;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          {/* TODO: 오버플로우 컨테이너 */}
          <div
            css={css`
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 16px;
            `}
          >
            {messages.map((message, index, array) => {
              if (message.sender === "SYSTEM") {
                return (
                  <ChatBubbleStack key={message.messageId} message={message} isJustSent={index === array.length - 1} />
                );
              }
              return <ChatBubble key={message.messageId} sender={message.sender} message={message.answers[0]} />;
            })}
          </div>
          <AcceptRejectButtons open={showAcceptRejectButtons} />
        </div>
      </div>

      <div>
        <FullscreenOverflowDivider />
        <div
          css={css`
            padding: 16px 20px;
          `}
        >
          <TextFieldInChat />
        </div>
      </div>
    </MainContent>
  );
}
