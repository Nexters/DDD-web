"use client";
import React, { useCallback } from "react";
import ChatHeader from "./ChatHeader";
import { css } from "styled-components";
import QuickQuestionPickerBoxB from "./QuickQuestionPickerBoxB";
import FullscreenOverflowDivider from "@/shared/components/FullscreenOverflowDivider";
import TextFieldInChatOverview from "./TextFieldInChatOverview";
import { useChatMessagesContext } from "../hooks/useChatMessagesStore";
import { useStickToBottom } from "use-stick-to-bottom";
import MainContent from "@/shared/components/MainContent";
import ChatBubble from "./ChatBubble";
import ChatBubbleGroup from "./ChatBubbleGroup";
import { useEffect, useMemo } from "react";
import { delay } from "@/shared/utils/delay";
import { MessageType } from "../types/message";

const BChatOverview = () => {
  const { scrollRef, contentRef } = useStickToBottom();

  const {
    copyServerState,
    state: messages,
    addMessage,
    editMessage,
    deleteMessage,
  } = useChatMessagesContext();

  // const messages1 = {
  //   answers: [
  //     "음, 고양이 발자국처럼 살금살금 다가가보는 건 어떨까냥? 타로 카드 한 장 뽑아서 힌트를 얻어보자냥! 🐾✨",
  //     "123",
  //     "먼저 다가가는 건 용기 있는 행동이야.",
  //     "상대방의 마음도 살펴보면서,",
  //     "조금씩 다가가는 게 좋을 것 같아.",
  //   ],
  //   messageId: 2145,
  //   sender: "SYSTEM",
  //   type: "SYSTEM_TAROT_QUESTION_REPLY",
  // };
  const InitMessages = {
    messageId: Math.random(),
    type: "SYSTEM_HELLO",
    sender: "SYSTEM",
    loading: false,
    answers: [
      "안녕 집사 🐾",
      "따뜻한 마룻바닥이 그리운 겨울 밤이야",
      "오늘은 어떤게 궁금해서 찾아왔어냥?",
    ],
  };
  const displayMessages = useCallback(async () => {
    const loadingMessageId = Math.random();
    addMessage({
      messageId: loadingMessageId,
      type: "SYSTEM_NORMAL_REPLY",
      sender: "SYSTEM",
      loading: true,
      answers: [],
    });

    await delay(1000); // 1초 대기

    // 2. 로딩 메시지 삭제 후 첫 번째 메시지 추가
    deleteMessage(loadingMessageId);
    addMessage({
      messageId: InitMessages.messageId,
      type: InitMessages.type,
      sender: InitMessages.sender,
      loading: false,
      answers: [InitMessages.answers[0]],
    } as MessageType);

    // 3. 순차적으로 메시지 업데이트 (1초마다)
    for (let index = 1; index < InitMessages.answers.length; index++) {
      await delay(1000);

      editMessage({
        messageId: InitMessages.messageId,
        type: InitMessages.type,
        sender: InitMessages.sender,
        answers: InitMessages.answers.slice(0, index + 1),
      } as MessageType);
    }
  }, []);
  useEffect(() => {
    displayMessages();
  }, []);

  return (
    <MainContent>
      <div
        css={css`
          padding: 0px 20px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        `}
      >
        <ChatHeader />
        <div
          ref={contentRef}
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 16px;
          `}
        >
          {messages[0] && messages[0].sender === "SYSTEM" && (
            <ChatBubbleGroup key={messages[0].messageId} message={messages[0]} />
          )}
        </div>

        <QuickQuestionPickerBoxB />
        <div>
          <FullscreenOverflowDivider />
          <div
            css={css`
              padding: 16px 20px;
            `}
          >
            <TextFieldInChatOverview />
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default BChatOverview;
