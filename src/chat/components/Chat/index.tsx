"use client";

import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import ChatHeader from "../ChatHeader";
import ChatRoom from "../ChatRoom";

export default function Chat() {
  return (
    <>
      <ChatHeader />
      <ChatMessagesProvider>
        <ChatRoom />
      </ChatMessagesProvider>
    </>
  );
}
