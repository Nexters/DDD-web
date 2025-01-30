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
          /**
          FIXME: 데스크탑에서 스크롤바 영역이 좁게 설정된 (600px) 모습이 전체 화면을 채우는 디바이더와 어색한 조화를 이루어 스크롤바 영역 임시 제거.
           */
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        <ChatHeader />
        <div
          ref={contentRef}
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 16px;
          `}
        >
          {messages.map((message, index, array) => {
            if (message.sender === "SYSTEM") {
              return <ChatBubbleGroup key={message.messageId} message={message} />;
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
