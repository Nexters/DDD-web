"use client";

import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import ChatHeader from "../ChatHeader";
import ChatRoom from "../ChatRoom";

export default function Chat() {
  // TODO: 채팅 메세지 목록 프리페치 SSR 필요
  return (
    <>
      <ChatHeader />
      <ChatMessagesProvider>
        <ChatRoom />
      </ChatMessagesProvider>
    </>
  );
}
