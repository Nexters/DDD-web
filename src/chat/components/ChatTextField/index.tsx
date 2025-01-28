"use client";
import { useCreateChatRoom } from "@/chat/hooks/useCreateChatRoom";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMesasge";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up-default.svg";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
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

    if (chatId) {
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
      return;
    }

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
  const maxMessageLength = 300;
  const disabled = isCreatingChatRoom || isSendingChatMessage;

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        position: relative;
        border-radius: 8px;
      `}
    >
      <Tooltip.Provider>
        <Tooltip.Root open={message.length === maxMessageLength}>
          <Tooltip.Trigger asChild>
            <TextareaAutosize
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
                ${disabled &&
                css`
                  color: ${({ theme }) => theme.colors.grey40};
                  background-color: ${({ theme }) => theme.colors.grey10};
                `}
              `}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              css={css`
                background-color: ${({ theme }) => theme.colors.grey90};
                color: ${({ theme }) => theme.colors.white};
                padding: 6px 8px;
                border-radius: 8px;
                ${({ theme }) => theme.fonts.body1}
                text-align: center;
              `}
            >
              <Tooltip.Arrow
                width={16}
                height={10}
                css={css`
                  fill: ${({ theme }) => theme.colors.grey90};
                `}
              />
              미안하지만 고양이가 알아들을 수 있는
              <br />
              글자 수는 300자까지야 냥
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
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
