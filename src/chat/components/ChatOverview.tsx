"use client";

import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import { TextFieldInChatDisplayProvider } from "@/chat/hooks/useTextFieldInChatDisplayStore";
import BChatOverview from "./BChatOverview";
import React from "react";
export default function ChatOverview() {
  return (
    <ChatMessagesProvider>
      <TextFieldInChatDisplayProvider>
        <BChatOverview />
      </TextFieldInChatDisplayProvider>
    </ChatMessagesProvider>
  );
}
