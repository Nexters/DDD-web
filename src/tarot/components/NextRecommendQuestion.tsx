import styled from "styled-components";
import { useTarotQuestionRecommends } from "../hooks/useTarotQuestionRecommends";

interface NextRecommendQuestionProps {
  handleRecommendQuestionChat: (id: number, question: string) => void;
}

const NextRecommendQuestion = ({ handleRecommendQuestionChat }: NextRecommendQuestionProps) => {
  const { data } = useTarotQuestionRecommends();

  return (
    <RecommendBox>
      <div>
        <SubText>더 알려줘 타로냥!</SubText>
        <MainText>이어서 물어보면 좋을 질문</MainText>
      </div>
      <RecommendContainer>
        {data?.questions.map((item, idx) => (
          <RecommendQuestionBtn
            key={idx}
            onClick={() => handleRecommendQuestionChat(item.recommendQuestionId, item.question)}
          >
            <QuestionTitle>{item.question} </QuestionTitle>

            <NextQuestionAffordance>이 질문하기 &gt;</NextQuestionAffordance>
          </RecommendQuestionBtn>
        ))}
      </RecommendContainer>
    </RecommendBox>
  );
};

export default NextRecommendQuestion;

const QuestionTitle = styled.h4`
  ${({ theme }) => theme.fonts.subHead2};
  color: ${({ theme }) => theme.colors.grey70};
  text-align: left;
`;
const NextQuestionAffordance = styled.p`
  ${({ theme }) => theme.fonts.captionBold};

  color: ${({ theme }) => theme.colors.primary03};
`;

const RecommendQuestionBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
  height: 96px;

  background-color: ${({ theme }) => theme.colors.primary00};
  border-radius: 8px;

  padding: 8px 12px;
  @media screen and (max-width: 600px) {
    height: fit-content;
  }
`;

const SubText = styled.h3`
  color: ${({ theme }) => theme.colors.grey60};
  ${({ theme }) => theme.fonts.body2};
`;

const MainText = styled.h3`
  color: ${({ theme }) => theme.colors.grey90};
  ${({ theme }) => theme.fonts.subHead4};
`;
const RecommendContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 12px;
  grid-row-gap: 12px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const RecommendBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  & div {
    text-align: center;
  }
`;
