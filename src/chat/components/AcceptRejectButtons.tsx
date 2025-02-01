import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMessage";
import { delay } from "@/shared/utils/delay";
import { useParams } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { useTarotCardDeckDisplayContext } from "../hooks/useTarotCardDeckDisplayStore";
import { useTextFieldInChatDisplayContext } from "../hooks/useTextFieldInChatDisplayStore";
import ChipButton from "./ChipButton";
export default function AcceptRejectButtons() {
  const { addMessage, deleteMessage, editMessage, state: messages } = useChatMessagesContext();
  const { mutate: sendChatMessage } = useSendChatMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    enable: enableTextField,
    disable: disableTextField,
    hide: hideTextField,
    focus: focusTextField,
  } = useTextFieldInChatDisplayContext();
  const { show: showTarotCardDeck } = useTarotCardDeckDisplayContext();
  const { chatId } = useParams<{ chatId: string }>();

  const rejectMessage = "아니, 얘기 더 들어봐";
  const acceptMessage = "좋아! 타로 볼래";

  const isSystemRepliedQuestion = messages[messages.length - 1]?.type === "SYSTEM_TAROT_QUESTION_REPLY";

  if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");

  const handleAcceptClick = async () => {
    setIsButtonDisabled(true);
    hideTextField();
    addMessage({
      messageId: Math.random(),
      type: "USER_NORMAL",
      sender: "USER",
      answers: [acceptMessage],
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
        message: acceptMessage,
        intent: "TAROT_ACCEPT",
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
      }
    );
    setIsButtonDisabled(false);
    showTarotCardDeck();
  };

  const handleRejectClick = async () => {
    setIsButtonDisabled(true);
    disableTextField();
    addMessage({
      messageId: Math.random(),
      type: "USER_NORMAL",
      sender: "USER",
      answers: [rejectMessage],
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
        message: rejectMessage,
        intent: "TAROT_DECLINE",
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
          enableTextField();
          await delay(1);
          focusTextField();
        },
      }
    );
    setIsButtonDisabled(false);
  };

  if (!isSystemRepliedQuestion) return null;

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
        margin-top: 76px;
      `}
    >
      <ChipButton type="button" disabled={isButtonDisabled} color="primary02" onClick={handleAcceptClick}>
        {acceptMessage}
      </ChipButton>
      <ChipButton type="button" disabled={isButtonDisabled} color="grey30" onClick={handleRejectClick}>
        {rejectMessage}
      </ChipButton>
    </div>
  );
}
