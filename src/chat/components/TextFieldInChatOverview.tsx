"use client";
import { useCreateChatRoom } from "@/chat/hooks/useCreateChatRoom";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { SendChatMessageRequest } from "../apis/sendChatMessage";
import TextareaAutoSize from "./TextareaAutoSize";

export default function TextFieldInChatOverview() {
  const [message, setMessage] = useState("");
  const { mutate: createChatRoom } = useCreateChatRoom();
  const router = useRouter();
  const [isMessageSent, setIsMessageSent] = useState(false);
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

  const submit = () => {
    setMessage("");
    setIsMessageSent(true);

    createChatRoom(undefined, {
      onSuccess: (data) => {
        const messageRequest: SendChatMessageRequest = {
          roomId: data.roomId,
          message: message,
          intent: "NORMAL",
        };

        router.push(`/chats/${data.roomId}?message=${JSON.stringify(messageRequest)}`);
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };
  const maxMessageLength = 300;
  const disabled = isMessageSent;

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
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) return;
          if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            submit();
          }
        }}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        disabled={disabled}
        placeholder="오늘의 운세는 어떨까?"
        minRows={1}
        maxRows={8}
        maxLength={maxMessageLength}
        autoFocus
      />
      <button
        type="submit"
        disabled={disabled || isOnlyWhiteSpace}
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
