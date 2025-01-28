import { MessageType } from "@/chat/models/message";
import { css, styled } from "styled-components";
import ChatAvatar from "../ChatAvatar";
import ChatBubble from "../ChatBubble";

type Props = {
  message: MessageType;
};

export default function ChatBubbleGroup({ message }: Props) {
  const renderMessage = (message: MessageType) => {
    if (message.tarotName) {
      return <ChatBubble key={message.messageId} sender={"SYSTEM"} card={message.tarotName} />;
    }

    if (message.loading) {
      return <ChatBubble key={message.messageId} sender={"SYSTEM"} loading />;
    }
    console.log(message);
    return message.answers.map((answer) => <ChatBubble key={message.messageId} sender={"SYSTEM"} message={answer} />);
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
