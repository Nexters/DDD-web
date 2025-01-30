import { useChatMessagesContext } from "@/chat/hooks/useChatMessagesStore";
import { useSendChatMessage } from "@/chat/hooks/useSendChatMesasge";
import { delay } from "@/shared/utils/delay";
import { useParams } from "next/navigation";
import { css } from "styled-components";
import ChipButton from "./ChipButton";

type Props = {
  open: boolean;
};

export default function AcceptRejectButtons({ open }: Props) {
  const { addMessage, deleteMessage, editMessage } = useChatMessagesContext();
  const { mutate: sendChatMessage, isPending: isSendingChatMessage } = useSendChatMessage();
  const { chatId } = useParams<{ chatId: string }>();

  const rejectMessage = "아니, 얘기 더 들어봐";
  const acceptMessage = "좋아! 타로 볼래";

  if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");

  const handleAcceptClick = async () => {
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
      }
    );
  };

  const handleRejectClick = async () => {
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
        },
      }
    );
  };

  if (!open) return null;

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
        margin-top: 76px;
      `}
    >
      <ChipButton type="button" disabled={isSendingChatMessage} color="primary02" onClick={handleAcceptClick}>
        {acceptMessage}
      </ChipButton>
      <ChipButton type="button" disabled={isSendingChatMessage} color="grey30" onClick={handleRejectClick}>
        {rejectMessage}
      </ChipButton>
    </div>
  );
}
