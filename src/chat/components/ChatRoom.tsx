"use client";

import AcceptRejectButtons from "@/chat/components/AcceptRejectButtons";
import ChatBubble from "@/chat/components/ChatBubble";
import ChatBubbleGroup from "@/chat/components/ChatBubbleGroup";
import TextFieldInChat from "@/chat/components/TextFieldInChat";
import { useChatMessages } from "@/chat/hooks/useChatMessages";
import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import MainContent from "@/shared/components/MainContent";
import { delay } from "@/shared/utils/delay";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { css } from "styled-components";
import { useStickToBottom } from "use-stick-to-bottom";
import { SendChatMessageRequest } from "../apis/sendChatMessage";
import { useSendChatMessage } from "../hooks/useSendChatMessage";
import { useTextFieldInChatDisplayContext } from "../hooks/useTextFieldInChatDisplayStore";
import ChatHeader from "./ChatHeader";

export default function ChatRoom() {
  const { chatId } = useParams<{ chatId: string }>();
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");
  const { data } = useChatMessages(Number(chatId));
  const { scrollRef, contentRef } = useStickToBottom();
  const { copyServerState, state: messages, addMessage, editMessage, deleteMessage } = useChatMessagesContext();
  const {
    isVisible: isTextFieldVisible,
    enable: enableTextField,
    disable: disableTextField,
    focus: focusTextField,
  } = useTextFieldInChatDisplayContext();
  const { mutate: sendChatMessage } = useSendChatMessage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    copyServerState(data.messages);
    if (!initialMessage) return;
    router.replace(pathname);
    const message = JSON.parse(initialMessage) as SendChatMessageRequest;

    disableTextField();

    addMessage({
      messageId: Math.random(),
      type: "USER_NORMAL",
      sender: "USER",
      answers: [message.message],
    });

    const loadingMessageId = Math.random();

    addMessage({
      messageId: loadingMessageId,
      type: "SYSTEM_NORMAL_REPLY",
      sender: "SYSTEM",
      loading: true,
      answers: [],
    });

    sendChatMessage(JSON.parse(initialMessage), {
      onSuccess: async (data) => {
        deleteMessage(loadingMessageId);

        addMessage({
          messageId: data.messageId,
          type: data.type,
          sender: data.sender,
          answers: [data.answers[0]],
        });

        for (let index = 1; index < data.answers.length; index++) {
          await delay(1000);
          editMessage({
            messageId: data.messageId,
            type: data.type,
            sender: data.sender,
            answers: data.answers.slice(0, index + 1),
          });
        }

        if (data.type === "SYSTEM_TAROT_QUESTION_REPLY") {
          disableTextField();
          return;
        }

        enableTextField();
        await delay(1);
        focusTextField();
      },
    });
  }, [data]);

  if (!chatId)
    throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");
  if (!data) return null;

  return (
    <MainContent>
      <div
        ref={scrollRef}
        css={css`
          flex: 1;
          padding: 0px 20px 16px;
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
                  <ChatBubbleGroup
                    key={message.messageId}
                    message={message}
                    isJustSent={index === array.length - 1}
                  />
                );
              }
              return (
                <ChatBubble
                  key={message.messageId}
                  sender={message.sender}
                  message={message.answers[0]}
                />
              );
            })}
          </div>
          <AcceptRejectButtons open={showAcceptRejectButtons} />
        </div>
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
          {messages.map((message) => {
            if (message.sender === "SYSTEM") {
              return <ChatBubbleGroup key={message.messageId} message={message} />;
            }
            return <ChatBubble key={message.messageId} sender={message.sender} message={message.answers[0]} />;
          })}
        </div>

        <AcceptRejectButtons />
      </div>

      {isTextFieldVisible && (
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
      )}
    </MainContent>
  );
}
