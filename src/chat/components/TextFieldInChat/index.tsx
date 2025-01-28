"use client";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMesasge";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import TextareaAutoSize from "../TextareaAutoSize";

export default function TextFieldInChat() {
  const [message, setMessage] = useState("");
  const { mutate: sendChatMessage, isPending: isSendingChatMessage } = useSendChatMessage();
  const queryClient = useQueryClient();
  const { chatId } = useParams<{ chatId: string }>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessageLength) {
      setMessage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    sendChatMessage(
      {
        roomId: Number(chatId),
        message: message,
        intent: "NORMAL",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["chatMessages", Number(chatId)] });
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
