"use client";
import styled from "styled-components";
import Image from "next/image";
import TarotImage from "@/shared/assets/images/Card1.jpg";
// import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useTarotQuestionRecommends } from "@/tarot/hooks/useTarotQuestionRecommends";

import { TarotCardType } from "@/tarot/models/tarotCard";
import findCardById from "@/tarot/utils/findCardById";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import ProfileIcon from "@/shared/assets/icons/profile.svg";
import LinkIcon from "@/shared/assets/icons/link.svg";
import DownLoadIcon from "@/shared/assets/icons/download.svg";

import Button from "@/shared/components/Button";

interface TarotReadingResultResponse {
  tarot: string;
  type: string;
  cardValue: {
    summary: string;
    description: string;
  };
  answer: {
    summary: string;
    description: string;
    question: string;
  };
  advice: {
    summary: string;
    description: string;
  };
}

const TarotResult = () => {
  const [data, setData] = useState<TarotReadingResultResponse | null>(null);
  const [tarrotCard, setTarotCard] = useState<TarotCardType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const { resultId } = useParams<{ resultId: string }>();

  const { data: recommendQuestions } = useTarotQuestionRecommends();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/v1/tarot/result/${resultId}`);
        const json = await res.json();
        setData(json.data);
        setTarotCard(findCardById(json.data.tarot));
      } catch (error) {
        console.error("Error fetching tarot data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [resultId]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  // const { data } = useTarotReadingResult();

  // console.log(resultId);

  // const { data, isError, isLoading } = useTarotReadingResult(Number(resultId));
  // console.log(data);
  console.log(recommendQuestions);

  return (
    <TarotResultWrapper>
      <TarotCard>
        <CardImg src={TarotImage} alt="TarotCard"></CardImg>
        <Title>
          {tarrotCard?.nameKR} <br /> {tarrotCard?.name}
        </Title>
      </TarotCard>

      <TarotCardResult>
        <ResultType>{data.type}</ResultType>

        <ResultBox>
          <h2> {data.cardValue.summary}</h2>
          <p> {data.cardValue.description}</p>
        </ResultBox>

        <ResultBox>
          <h2> {data.answer.summary}</h2>
          <p> {data.answer.description}</p>

          <ChatImageFrame>
            <UserMessageBubble>
              <div>전남친이 아직 저에게 미련이 남았는지 궁금해요</div>
            </UserMessageBubble>
            <SystemMassegeBubble>
              <ProfileIcon />
              <div>
                <p>타로냥</p>
                <SystemMessgeDelay></SystemMessgeDelay>
              </div>
            </SystemMassegeBubble>
          </ChatImageFrame>
        </ResultBox>

        <ResultBox>
          <h2> {data.advice.summary}</h2>
          <p> {data.advice.description}</p>
        </ResultBox>
      </TarotCardResult>

      <IconBtnWrapper>
        <IconBtn>
          결과 저장하기 <DownLoadIcon />
        </IconBtn>
        <IconBtn>
          링크 복사하기 <LinkIcon />
        </IconBtn>
      </IconBtnWrapper>

      <AdditionalMessage>
        집사의 고민이 잘 해결되었으면 좋겠다냥! <br /> 궁금한게 있으면 더
        물어봐라냥
      </AdditionalMessage>

      <Divider />

      <RecommendBox>
        <SubText>다른 집사들도 타로냥에게 물어봤어요</SubText>
        <MainText>나도 물어보면 좋을 질문</MainText>
        <RecommendContainer>
          {recommendQuestions?.questions.map((item, idx) => (
            <RecommendQuestion key={idx}>
              <QuestionCount> {item.referenceCount}</QuestionCount>
              <QuestionTitle>{item.question} </QuestionTitle>
            </RecommendQuestion>
          ))}
        </RecommendContainer>
      </RecommendBox>

      <Button color="grey70" css={{ marginBottom: "98px" }}>
        이어서 대화하기
      </Button>
    </TarotResultWrapper>
  );
};

export default TarotResult;

const QuestionTitle = styled.div`
  ${({ theme }) => theme.fonts.subHead2};
  color: ${({ theme }) => theme.colors.grey80};
`;
const QuestionCount = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.grey80};
`;

const RecommendQuestion = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 120px;

  background-color: ${({ theme }) => theme.colors.primary00};
  /* background-color: scpt */
  border-radius: 12px;

  padding: 24px 20px;
`;

const SubText = styled.h3`
  color: ${({ theme }) => theme.colors.grey40};
  ${({ theme }) => theme.fonts.subHead3};
`;

const MainText = styled.h3`
  color: ${({ theme }) => theme.colors.grey90};
`;
const RecommendContainer = styled.div`
  width: 100%;
  height: 252px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
`;
const RecommendBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
`;

const Divider = styled.div`
  height: 11px;

  /* box-shadow: 0 0 0 100vmax ${(props) => props.theme.colors.grey10};
  clip-path: inset(0px -100vmax); */

  width: calc(100% + 44px * 2);

  margin: 44px 0 44px 0;
  background-color: ${({ theme }) => theme.colors.grey10};

  overflow: hidden;
`;

const AdditionalMessage = styled.p`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grey50};
  text-align: center;
`;
const IconBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;
const IconBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  background-color: ${({ theme }) => theme.colors.grey10};
  color: ${({ theme }) => theme.colors.grey70};
  ${({ theme }) => theme.fonts.subHead1};
  border-radius: 12px;
  padding: 12px;
`;

const SystemMessgeDelay = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grey00};
  & > div {
    display: flex;
    gap: 4px;
  }
`;

const SystemMassegeBubble = styled.div`
  display: flex;
  gap: 8px;
  height: 66px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > p {
      color: ${({ theme }) => theme.colors.grey90};
      ${({ theme }) => theme.fonts.subHead1};
    }
  }
`;

const UserMessageBubble = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

  & > div {
    width: 219px;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.primary01};

    padding: 6px 9px;
  }

  /* font 추가 필요 */
`;

const ChatImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 23px 26px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};

  max-width: 303px;
  width: 100%;
  height: 177px;

  gap: 13px;
`;
const ResultBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 24px 20px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.grey00};
  border-radius: 12px;

  width: 100%;

  & > h2 {
    ${({ theme }) => theme.fonts.subHead2};
    color: ${({ theme }) => theme.colors.grey90};
    text-align: center;
  }

  & p {
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.grey80};
    text-align: center;
  }
`;

const ResultType = styled.div`
  width: 75px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.grey60};
  color: ${({ theme }) => theme.colors.white};
`;

const TarotCardResult = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 12px;
`;

const Title = styled.h1`
  text-align: center;
  ${({ theme }) => theme.fonts.headline2};
  color: ${({ theme }) => theme.colors.grey90};
`;

const TarotCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 17px;
`;

const CardImg = styled(Image)`
  width: 169px;
  height: 254px;
`;

const TarotResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  gap: 32px;
  padding: 0 44px;

  @media screen and (max-width: 600px) {
    padding: 0 26px;
  }
`;
