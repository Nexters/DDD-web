"use client";
import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMesasge";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import { delay } from "@/shared/utils/delay";
import { useParams } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import TextareaAutoSize from "./TextareaAutoSize";

export default function TextFieldInChat() {
  const [message, setMessage] = useState("");
  const { mutate: sendChatMessage, isPending: isSendingChatMessage } = useSendChatMessage();
  const { chatId } = useParams<{ chatId: string }>();
  const { addMessage, deleteMessage } = useChatMessagesContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessageLength) {
      setMessage(value);
    }
  };

  // TODO: 채팅을 전송한 경우 최하단으로 스크롤
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    addMessage({
      messageId: Math.random(),
      type: "USER_NORMAL",
      sender: "USER",
      answers: [message],
    });

    await delay(500);

    const loadingMessageId = Math.random();

    addMessage({
      messageId: loadingMessageId,
      type: "SYSTEM_NORMAL_REPLY",
      sender: "SYSTEM",
      loading: true,
      answers: [],
    });

    sendChatMessage(
      {
        roomId: Number(chatId),
        message: message,
        intent: "NORMAL",
      },
      {
        onSuccess: (data) => {
          deleteMessage(loadingMessageId);

          addMessage({
            messageId: data.messageId,
            type: data.type,
            sender: data.sender,
            answers: data.answers,
          });
        },
      }
    );
  };
  const maxMessageLength = 300;
  const disabled = isSendingChatMessage;

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        position: relative;
        border-radius: 8px;
      `}
    >
      <TextareaAutoSize
        value={message}
        onChange={handleChange}
        disabled={disabled}
        placeholder="오늘의 운세는 어떨까?"
        minRows={1}
        maxRows={8}
        maxLength={maxMessageLength}
      />
      <button
        type="submit"
        disabled={disabled}
        css={css`
          position: absolute;
          right: 12px;
          bottom: 12px;
          padding: 4px;
          border-radius: 4px;
          background-color: ${({ theme }) => theme.colors.primary03};
          &:disabled {
            background-color: ${({ theme }) => theme.colors.grey20};
            pointer-events: none;
          }
        `}
        aria-label="메세지 전송"
      >
        <ArrowUpIcon
          width={24}
          height={24}
          css={css`
            display: block;
            color: ${({ theme }) => theme.colors.grey00};
          `}
        />
      </button>
    </form>
  );
}
