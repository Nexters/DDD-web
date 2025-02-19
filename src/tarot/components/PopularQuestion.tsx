import styled from "styled-components";
import { useState } from "react";
import PopularQuestionPrizeIcon from "./PopularQuestionPrizeIcon";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg";
import ArrowDown from "@/shared/assets/icons/arrow-down.svg";
import { useTarotFollowQuestion } from "../hooks/useTarotFollowQuestion";
import { useParams } from "next/navigation";

const PopularQuestions = () => {
  const [moreQuestionsToggle, setMoreQuestionsToggle] = useState(false);
  const { chatId } = useParams<{ chatId: string }>();

  const { data } = useTarotFollowQuestion(Number(chatId));
  console.log(data);
  const recommendQuestions = {
    questions: [
      {
        recommendQuestionId: 101,
        question: "오늘 하루를 잘 보내기 위한 조언은?",
        referenceCount: 42,
      },
      {
        recommendQuestionId: 102,
        question: "현재 내 삶에서 가장 중요한 것은 무엇인가요?",
        referenceCount: 35,
      },
      {
        recommendQuestionId: 103,
        question: "다가오는 변화에 어떻게 대비해야 할까요?",
        referenceCount: 27,
      },
      {
        recommendQuestionId: 104,
        question: "내가 놓치고 있는 중요한 기회는 무엇인가요?",
        referenceCount: 19,
      },
      {
        recommendQuestionId: 101,
        question: "오늘 하루를 잘 보내기 위한 조언은?",
        referenceCount: 42,
      },
      {
        recommendQuestionId: 102,
        question: "현재 내 삶에서 가장 중요한 것은 무엇인가요?",
        referenceCount: 35,
      },
      {
        recommendQuestionId: 103,
        question: "다가오는 변화에 어떻게 대비해야 할까요?",
        referenceCount: 27,
      },
      {
        recommendQuestionId: 104,
        question: "내가 놓치고 있는 중요한 기회는 무엇인가요?",
        referenceCount: 19,
      },
      {
        recommendQuestionId: 103,
        question: "다가오는 변화에 어떻게 대비해야 할까요?",
        referenceCount: 27,
      },
      {
        recommendQuestionId: 104,
        question: "내가 놓치고 있는 중요한 기회는 무엇인가요?",
        referenceCount: 19,
      },
    ],
  };

  return (
    <PopularQuestionsWrapper>
      <TextWrapper>
        <SubText>이런 질문은 어때요?</SubText>
        <MainText> 많이 물어보는 질문</MainText>
      </TextWrapper>

      <QuestionWrapper>
        {recommendQuestions?.questions.map((item, idx) =>
          idx < 5 ? (
            <QuestionBtn key={idx}>
              <PopularQuestionPrizeIcon prize={idx + 1} />
              <BtnText>{item.question}</BtnText>
              <ArrowRight />
            </QuestionBtn>
          ) : null
        )}

        {!moreQuestionsToggle && (
          <AddQuestionBtn onClick={() => setMoreQuestionsToggle(true)}>
            질문 더 보기
            <ArrowDown />
          </AddQuestionBtn>
        )}
        {moreQuestionsToggle &&
          recommendQuestions?.questions.slice(5, 10).map((item, idx) => (
            <QuestionBtn key={idx}>
              <PopularQuestionPrizeIcon prize={idx + 6} />
              <BtnText>{item.question}</BtnText>
              <ArrowRight />
            </QuestionBtn>
          ))}
      </QuestionWrapper>
    </PopularQuestionsWrapper>
  );
};

export default PopularQuestions;
const AddQuestionBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  ${({ theme }) => theme.fonts.subHead1};
  color: ${({ theme }) => theme.colors.grey70};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularQuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;
  width: 100%;
  padding: 0 20px 32px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

const QuestionBtn = styled.button`
  display: flex;

  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grey00};
`;

const BtnText = styled.p`
  color: ${({ theme }) => theme.colors.grey70};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.subHead2};
`;

const SubText = styled.h3`
  color: ${({ theme }) => theme.colors.grey60};
  ${({ theme }) => theme.fonts.body2};
`;

const MainText = styled.h3`
  color: ${({ theme }) => theme.colors.grey90};
  ${({ theme }) => theme.fonts.subHead4};
`;
