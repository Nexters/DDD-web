"use client";

import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import { TextFieldInChatDisplayProvider } from "@/chat/hooks/useTextFieldInChatDisplayStore";
import { TarotCardDeckDisplayDisplayProvider } from "../hooks/useTarotCardDeckDisplayStore";
import ChatRoomA from "./ChatRoomA";
import ChatRoom from "./ChatRoom";
export default function Chat() {
  // TODO: 채팅 메세지 목록 프리페치 SSR 필요
  return (
    <ChatMessagesProvider>
      <TextFieldInChatDisplayProvider>
        <TarotCardDeckDisplayDisplayProvider>
          {window.location.pathname.split("/")[1] === "test-a" ? <ChatRoomA /> : <ChatRoom />}
        </TarotCardDeckDisplayDisplayProvider>
      </TextFieldInChatDisplayProvider>
    </ChatMessagesProvider>
  );
}
