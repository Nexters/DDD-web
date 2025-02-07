import { useCreateChatRoom } from "@/chat/hooks/useCreateChatRoom";
import { TarotQuestionRecommendListResponse } from "@/tarot/apis/getTarotQuestionRecommends";
import { useTarotQuestionRecommends } from "@/tarot/hooks/useTarotQuestionRecommends";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { SendChatMessageRequest } from "../apis/sendChatMessage";
import QuickQuestionPickerB from "./QuickQuestionPickerB";
import ReloadIcon from "@/shared/assets/icons/reload.svg";
import { useQueryClient } from "@tanstack/react-query";
export default function QuickQuestionPickerBoxB() {
  const { data } = useTarotQuestionRecommends();
  const { mutate: createChatRoom } = useCreateChatRoom();
  const router = useRouter();
  const [isQuestionPicked, setIsQuestionPicked] = useState(false);
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["tarotQuestionRecommends"] });
  };

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

            router.push(`/chats/${data.roomId}?message=${JSON.stringify(messageRequest)}`);
          },
        });
      },
    }));
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 24px 20px;
      `}
    >
      <button
        css={css`
          padding: 5px 0;
          display: flex;
          align-items: center;
        `}
        onClick={handleClick}
      >
        <p
          css={css`
            ${({ theme }) => theme.fonts.subHead2};
            margin-right: 6px;
          `}
        >
          이런 질문은 어때요?
        </p>
        <ReloadIcon />
      </button>
      <div
        css={css`
          display: flex;
          gap: 8px;

          overflow-x: auto;
          -ms-overflow-style: none; /* IE, Edge */
          scrollbar-width: none; /* Firefox */
          ::-webkit-scrollbar {
            display: none;
          }
          & > .no-scroll::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      >
        {adaptQuestionRecommends(data).map((question) => (
          <QuickQuestionPickerB
            key={question.recommendQuestionId}
            question={question.question}
            onClick={question.onClick}
            selectedCount={question.referenceCount}
            color={question.color}
          />
        ))}
      </div>
    </div>
  );
}
