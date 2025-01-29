import { MessageType } from "@/chat/models/message";
import { css, styled } from "styled-components";
import ChatAvatar from "./ChatAvatar";
import ChatBubble from "./ChatBubble";

type Props = {
  message: MessageType;
  isJustSent: boolean;
};

export default function ChatBubbleGroup({ message }: Props) {
  // TODO: 응답을 새로 받은 경우에만 메세지를 순차적으로 렌더링
  const renderMessage = (message: MessageType) => {
    if (message.tarotName) {
      return <ChatBubble key={message.messageId} sender={"SYSTEM"} card={message.tarotName} />;
    }

    if (message.loading) {
      return <ChatBubble key={message.messageId} sender={"SYSTEM"} loading />;
    }

    const addIdToMessages = (messages: string[]) => {
      return messages.map((answer) => ({ messageId: Math.random(), sender: "SYSTEM", message: answer }));
    };
    return addIdToMessages(message.answers).map((answer) => (
      <ChatBubble key={answer.messageId} sender={"SYSTEM"} message={answer.message} />
    ));
  };

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <ChatAvatar />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <Nickname>타로냥</Nickname>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          {renderMessage(message)}
        </div>
      </div>
    </div>
  );
}

const Nickname = styled.p`
  ${({ theme }) => theme.fonts.subHead1}
  color: ${({ theme }) => theme.colors.grey90};
`;
