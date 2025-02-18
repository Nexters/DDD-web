import styled from "styled-components";
import { useParams } from "next/navigation";
import { useTarotFollowQuestion } from "../hooks/useTarotFollowQuestion";
interface NextRecommendQuestionProps {
  handleRecommendQuestionChat: (id: number, question: string) => void;
}

const NextRecommendQuestion = ({ handleRecommendQuestionChat }: NextRecommendQuestionProps) => {
  const { chatId } = useParams();
  console.log(chatId);
  const { data: questions } = useTarotFollowQuestion(Number(chatId));
  console.log(questions);
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
    ],
  };

  return (
    <RecommendBox>
      <div>
        <SubText>다른 집사들도 타로냥에게 물어봤어요</SubText>
        <MainText>나도 물어보면 좋을 질문</MainText>
      </div>
      <RecommendContainer>
        {recommendQuestions?.questions.map((item, idx) => (
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
