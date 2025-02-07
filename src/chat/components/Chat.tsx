"use client";

import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import { TextFieldInChatDisplayProvider } from "@/chat/hooks/useTextFieldInChatDisplayStore";
import { TarotCardDeckDisplayDisplayProvider } from "../hooks/useTarotCardDeckDisplayStore";
import ChatRoomA from "./ChatRoomA";
import ChatRoom from "./ChatRoom";
import { usePathname } from "next/navigation";
export default function Chat() {
  const pathname = usePathname();
  // TODO: 채팅 메세지 목록 프리페치 SSR 필요
  return (
    <ChatMessagesProvider>
      <TextFieldInChatDisplayProvider>
        <TarotCardDeckDisplayDisplayProvider>
          {pathname === "test-a" ? <ChatRoomA /> : <ChatRoom />}
        </TarotCardDeckDisplayDisplayProvider>
      </TextFieldInChatDisplayProvider>
    </ChatMessagesProvider>
  );
}
