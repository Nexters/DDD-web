"use client";

import AcceptRejectButtons from "@/chat/components/AcceptRejectButtons";
import ChatBubble from "@/chat/components/ChatBubble";
import ChatBubbleGroup from "@/chat/components/ChatBubbleGroup";
import TextFieldInChat from "@/chat/components/TextFieldInChat";
import { useChatMessages } from "@/chat/hooks/useChatMessages";
import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { css } from "styled-components";
import { useStickToBottom } from "use-stick-to-bottom";
import ChatHeader from "./ChatHeader";

export default function ChatRoom() {
  const { chatId } = useParams<{ chatId: string }>();
  const { data } = useChatMessages(Number(chatId));
  const { scrollRef, contentRef } = useStickToBottom();
  const { copyServerState, state: messages } = useChatMessagesContext();
  useEffect(() => {
    if (data) {
      copyServerState(data.messages);
    }
  }, [data]);

  if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");
  if (!data) return null;

  const showAcceptRejectButtons = messages[messages.length - 1]?.type === "SYSTEM_TAROT_QUESTION_REPLY";

  return (
    <MainContent>
      <div
        ref={scrollRef}
        css={css`
          flex: 1;
          padding: 0px 20px 16px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        <ChatHeader />
        {/* TODO: 오버플로우 컨테이너 */}

        <div
          ref={contentRef}
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
                <ChatBubbleGroup key={message.messageId} message={message} isJustSent={index === array.length - 1} />
              );
            }
            return <ChatBubble key={message.messageId} sender={message.sender} message={message.answers[0]} />;
          })}
        </div>

        <AcceptRejectButtons open={showAcceptRejectButtons} />
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
