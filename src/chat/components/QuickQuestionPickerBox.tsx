"use client";
import { useCreateChatRoom } from "@/chat/hooks/useCreateChatRoom";
import { TarotQuestionRecommendListResponse } from "@/tarot/apis/getTarotQuestionRecommends";
import { useTarotQuestionRecommends } from "@/tarot/hooks/useTarotQuestionRecommends";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { SendChatMessageRequest } from "../apis/sendChatMessage";
import QuickQuestionPicker from "./QuickQuestionPicker";
import RefreshQuickQuestionButton from "./RefreshQuickQuestionButton";

export default function QuickQuestionPickerBox() {
  const { data } = useTarotQuestionRecommends();
  const { mutate: createChatRoom } = useCreateChatRoom();
  const router = useRouter();
  const [isQuestionPicked, setIsQuestionPicked] = useState(false);
  const path = window.location.pathname;

  if (!data) return null;

  const adaptQuestionRecommends = (data: TarotQuestionRecommendListResponse) => {
    const colors = ["primary03", "grey10", "primary01", "grey60"] as const;

    return data.questions.map((question, i) => ({
      ...question,
      color: colors[i],
      onClick: async () => {
        if (isQuestionPicked) return;
        createChatRoom(undefined, {
          onSuccess: (data) => {
            setIsQuestionPicked(true);
            const messageRequest: SendChatMessageRequest = {
              roomId: data.roomId,
              message: question.question,
              intent: "RECOMMEND_QUESTION",
              referenceQuestionId: question.recommendQuestionId,
            };

            router.push(`${path}/chats/${data.roomId}?message=${JSON.stringify(messageRequest)}`);
          },
        });
      },
    }));
  };

  return (
    <div>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 8px;
          padding-inline: 20px;
        `}
      >
        {adaptQuestionRecommends(data).map((question) => (
          <QuickQuestionPicker
            key={question.recommendQuestionId}
            question={question.question}
            onClick={question.onClick}
            selectedCount={question.referenceCount}
            color={question.color}
          />
        ))}
      </div>
      <div
        css={css`
          width: fit-content;
          margin: 12px auto 0;
        `}
      >
        <RefreshQuickQuestionButton />
      </div>
    </div>
  );
}
