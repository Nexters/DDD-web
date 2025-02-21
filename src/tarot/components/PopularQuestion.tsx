import styled from "styled-components";
import { useState } from "react";
import PopularQuestionPrizeIcon from "./PopularQuestionPrizeIcon";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg";
import ArrowDown from "@/shared/assets/icons/arrow-down.svg";
import { useTarotQuestionRecommends } from "../hooks/useTarotQuestionRecommends";

const PopularQuestions = () => {
  const [moreQuestionsToggle, setMoreQuestionsToggle] = useState(false);

  const { data } = useTarotQuestionRecommends();

  return (
    <PopularQuestionsWrapper>
      <TextWrapper>
        <SubText>이런 질문은 어때요?</SubText>
        <MainText> 많이 물어보는 질문</MainText>
      </TextWrapper>

      <QuestionWrapper>
        {data?.questions.map((item, idx) =>
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
          data?.questions.slice(5, 10).map((item, idx) => (
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
