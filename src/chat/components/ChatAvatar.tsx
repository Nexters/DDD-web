import ChatBotProfileImage from "@/shared/assets/images/chatbot-profile.webp";
import Image from "next/image";
import { css } from "styled-components";
export default function ChatAvatar() {
  // TODO: 이미지로 교체
  return (
    <Image
      src={ChatBotProfileImage}
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
