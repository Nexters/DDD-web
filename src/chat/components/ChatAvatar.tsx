import Image from "next/image";
import { css } from "styled-components";
import NewChatBotProfileImage from "@/shared/assets/images/new-chat-profile.png";
export default function ChatAvatar() {
  return (
    <Image
      src={NewChatBotProfileImage}
      alt="타로냥 프로필 이미지"
      width={36}
      height={36}
      css={css`
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.grey10};
      `}
    />
  );
}
