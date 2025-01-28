"use client";
import { createUserKeyCookie } from "@/auth/utils/createUserKeyCookie";
import { useCreateChatRoom } from "@/chat/hooks/useCreateChatRoom";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMesasge";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { css } from "styled-components";

export default function ChatTextField() {
  const [message, setMessage] = useState("");
  const [isSingleLineTextarea, setIsSingleLineTextarea] = useState(true);
  const { mutate: createChatRoom, isPending: isCreatingChatRoom } = useCreateChatRoom();
  const { mutate: sendChatMessage, isPending: isSendingChatMessage } = useSendChatMessage();
  const router = useRouter();
  const textareaMinHeight = 52;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    await createUserKeyCookie();
    createChatRoom(undefined, {
      onSuccess: (data) => {
        sendChatMessage(
          {
            roomId: data.roomId,
            message: message,
            intent: "NORMAL",
          },
          {
            onSuccess: () => {
              router.push(`/chats/${data.roomId}`);
            },
          }
        );
      },
    });
  };

  const disabled = isCreatingChatRoom || isSendingChatMessage;

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        position: relative;
        border-radius: 8px;
      `}
    >
      <TextareaAutosize
        disabled={disabled}
        value={message}
        onChange={handleChange}
        placeholder="오늘의 운세는 어떨까?"
        minRows={1}
        maxRows={8}
        onHeightChange={(height) => {
          const isSingleLine = height <= textareaMinHeight;
          setIsSingleLineTextarea(isSingleLine);
        }}
        css={css`
          border: none;
          resize: none;
          padding: 10px 56px 10px 12px;
          width: 100%;
          height: ${isSingleLineTextarea ? `${textareaMinHeight}px` : "auto"};
          min-height: ${textareaMinHeight}px;
          border-radius: 8px;
          ${({ theme }) => theme.fonts.body3}
          line-height: ${isSingleLineTextarea ? "32px" : "24px"};
          background-color: ${({ theme }) => theme.colors.grey00};
          color: ${({ theme }) => theme.colors.grey90};
          caret-color: ${({ theme }) => theme.colors.grey90};
          &::placeholder {
            color: ${({ theme }) => theme.colors.grey30};
          }
          &:focus-visible {
            outline: none;
          }
          &:disabled {
            color: ${({ theme }) => theme.colors.grey40};
            background-color: ${({ theme }) => theme.colors.grey10};
          }
        `}
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
