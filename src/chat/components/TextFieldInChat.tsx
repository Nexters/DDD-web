"use client";
import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMessage";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import { delay } from "@/shared/utils/delay";
import { useParams } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { useTextFieldInChatDisplayContext } from "../hooks/useTextFieldInChatDisplayStore";
import TextareaAutoSize from "./TextareaAutoSize";

export default function TextFieldInChat() {
  const [message, setMessage] = useState("");
  const { mutate: sendChatMessage } = useSendChatMessage();
  const { chatId } = useParams<{ chatId: string }>();
  const { addMessage, deleteMessage, editMessage } = useChatMessagesContext();
  const {
    isDisabled: isTextFieldDisabled,
    enable: enableTextField,
    disable: disableTextField,
    textareaRef,
    focus: focusTextField,
  } = useTextFieldInChatDisplayContext();
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessageLength) {
      setMessage(value);
    }
  };

  const submit = async () => {
    setMessage("");
    disableTextField();

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
        },
        onError: () => {
          deleteMessage(loadingMessageId);
          addMessage({
            messageId: Math.random(),
            type: "SYSTEM_NORMAL_REPLY",
            sender: "USER",
            answers: ["문제가 생겼다냥! 다시 시도해봐냥."],
          });
        },
        onSettled: async () => {
          enableTextField();
          await delay(1);
          focusTextField();
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };
  const maxMessageLength = 300;

  const isOnlyWhiteSpace = message.trim().length === 0;

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
        disabled={isTextFieldDisabled}
        placeholder="오늘의 운세는 어떨까?"
        minRows={1}
        maxRows={8}
        maxLength={maxMessageLength}
        textareaRef={textareaRef}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) return;
          if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <button
        type="submit"
        disabled={isTextFieldDisabled || isOnlyWhiteSpace}
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
