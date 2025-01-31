"use client";
import styled, { useTheme, keyframes } from "styled-components";
import Image from "next/image";

import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import { useTarotQuestionRecommends } from "@/tarot/hooks/useTarotQuestionRecommends";

import findCardById from "@/tarot/utils/findCardById";
import { useParams } from "next/navigation";

import ProfileIcon from "@/shared/assets/icons/profile.svg";
import LinkIcon from "@/shared/assets/icons/link.svg";
import DownLoadIcon from "@/shared/assets/icons/download.svg";
import shareLink from "@/shared/utils/shareLink";
import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { useState } from "react";
import { div } from "motion/react-client";
const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const TarotResult = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const [toastOpen, setToastOpen] = useState(false);
  const { data: recommendQuestions } = useTarotQuestionRecommends();
  const { handleWebShare } = shareLink();
  const theme = useTheme();

  const { data, isError, isLoading } = useTarotReadingResult(Number(resultId));

  if (isError) {
    <div>Error</div>;
  }

  if (isLoading) {
    <div>isLoading</div>;
  }

  const TarotData = findCardById(data?.tarot);

  const handleShareLink = async () => {
    const shareSuccess = await handleWebShare();
    if (shareSuccess) {
      setToastOpen(true);
    }
  };
  return (
    <TarotResultWrapper>
      <TarotCard>
        <CardImg
          src={TarotData?.imgSrc}
          alt={TarotData?.alt}
          width={180}
          height={100}
        />
        <Title>
          {TarotData?.nameKR} <br />
          {TarotData?.name}
        </Title>
      </TarotCard>

      <TarotCardResult>
        <ResultType>{data?.type}</ResultType>

        <ResultBox>
          <h2> {data?.cardValue.summary}</h2>
          <p> {data?.cardValue.description}</p>
        </ResultBox>

        <ResultBox>
          <h2> {data?.answer.summary}</h2>
          <p> {data?.answer.description}</p>

          <ChatImageFrame>
            <UserMessageBubble>
              <div>전남친이 아직 저에게 미련이 남았는지 궁금해요</div>
            </UserMessageBubble>
            <SystemMassegeBubble>
              <ProfileIcon />
              <div>
                <p>타로냥</p>
                <SystemMessgeDelay>
                  <Dot $delay={0} $color={theme.colors.primary01} />
                  <Dot $delay={0.3} $color={theme.colors.primary02} />
                  <Dot $delay={0.6} $color={theme.colors.primary03} />
                </SystemMessgeDelay>
              </div>
            </SystemMassegeBubble>
          </ChatImageFrame>
        </ResultBox>

        <ResultBox>
          <h2> {data?.advice.summary}</h2>
          <p> {data?.advice.description}</p>
        </ResultBox>
      </TarotCardResult>

      <IconBtnWrapper>
        {/* To Do 기능 추가 */}
        <IconBtn>
          결과 저장하기 <DownLoadIcon />
        </IconBtn>
        <Toast.Provider>
          <IconBtn onClick={handleShareLink}>
            링크 복사하기 <LinkIcon />
          </IconBtn>
          <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
            <Toast.Title>링크 복사 완료!</Toast.Title>
          </Toast.Root>
          <Toast.Viewport> </Toast.Viewport>
        </Toast.Provider>
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
            <RecommendQuestionBtn key={idx}>
              <QuestionCount> {item.referenceCount}명이 질문 중</QuestionCount>
              <QuestionTitle>{item.question} </QuestionTitle>
            </RecommendQuestionBtn>
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

const Dot = styled.span<{ $delay: number; $color: string }>`
  width: 6px;
  height: 6px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${fadeInOut} 1.5s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const QuestionTitle = styled.div`
  ${({ theme }) => theme.fonts.subHead2};
  color: ${({ theme }) => theme.colors.grey80};
`;
const QuestionCount = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.grey80};
`;

const RecommendQuestionBtn = styled.button`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  height: 120px;

  background-color: ${({ theme }) => theme.colors.primary00};
  border-radius: 12px;

  padding: 24px 20px;

  @media screen and (max-width: 600px) {
    height: 79px;
    padding: 15px 20px;
  }
`;

const SubText = styled.h3`
  color: ${({ theme }) => theme.colors.grey40};
  ${({ theme }) => theme.fonts.subHead3};
`;

const MainText = styled.h3`
  color: ${({ theme }) => theme.colors.grey90};
  ${({ theme }) => theme.fonts.subHead1};
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
  gap: 4px;
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

  ${({ theme }) => theme.fonts.body1};
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
