"use client";

import QuickQuestionPickerBoxB from "./QuickQuestionPickerBoxB";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import { css } from "styled-components";
import TextFieldInChatOverview from "./TextFieldInChatOverview";
import ChatHeader from "./ChatHeader";
import { useStickToBottom } from "use-stick-to-bottom";
import { useTextFieldInChatDisplayContext } from "../hooks/useTextFieldInChatDisplayStore";
import { useEffect } from "react";
import { useChatMessagesContext } from "../hooks/useChatMessagesStore";
import { ChatMessagesProvider } from "@/chat/hooks/useChatMessagesStore";
import { TextFieldInChatDisplayProvider } from "@/chat/hooks/useTextFieldInChatDisplayStore";
import BChatOverview from "./BChatOverview";
import ChatBubble from "@/chat/components/ChatBubble";
import ChatBubbleGroup from "@/chat/components/ChatBubbleGroup";
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
