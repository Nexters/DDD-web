"use client";
import Image from "next/image";
import styled, { useTheme } from "styled-components";

import { useTarotQuestionRecommends } from "@/tarot/hooks/useTarotQuestionRecommends";
import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";

import findCardById from "@/tarot/utils/findCardById";
import { useParams } from "next/navigation";

import { SendChatMessageRequest } from "@/chat/apis/sendChatMessage";
import DownLoadIcon from "@/shared/assets/icons/download.svg";
import LinkIcon from "@/shared/assets/icons/link.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { checkBrowserForWebShare } from "@/shared/utils/checkBrowserForWebShare";
import shareLink from "@/shared/utils/shareLink";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import tarotResultCat from "@/shared/assets/images/tarotResultCat.png";
const TarotResultAfterView = () => {
  const { resultId, chatId } = useParams<{
    resultId: string;
    chatId: string;
  }>();

  const [toastOpen, setToastOpen] = useState(false);
  const { data: recommendQuestions } = useTarotQuestionRecommends();
  const shareURL = window.location.href;
  const { handleWebShare, handleCopyToClipboard } = shareLink(shareURL);
  const theme = useTheme();
  const router = useRouter();
  const { data, isError } = useTarotReadingResult(Number(resultId));
  const queryClient = useQueryClient();

  const handleShareLink = async () => {
    const shareSuccess = await handleCopyToClipboard();
    if (shareSuccess) {
      setToastOpen(true);
    }
  };

  const handleContinueConversation = () => {
    queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    router.push(`/chats/${chatId}`);
  };

  const handleContinueRecommendConversation = (recommendQuestionId: number, message: string) => {
    const object: SendChatMessageRequest = {
      roomId: Number(chatId),
      referenceQuestionId: recommendQuestionId,
      intent: "RECOMMEND_QUESTION",
      message: message,
    };

    queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
    router.push(`/chats/${chatId}?message=${JSON.stringify(object)}`);
  };

  if (isError) {
    return null;
  }

  if (data?.tarot) {
    const TarotData = findCardById(data?.tarot);

    if (!TarotData) {
      return null;
    }
    return (
      <TarotResultWrapper>
        <TarotCard>
          <TarotCardImageWrapper>
            <TarotCatImage src={tarotResultCat} alt="타로카드 이미지 고양이" />
            <CardImg src={TarotData?.imgSrc || ""} alt={TarotData?.alt || "타로카드 이미지"} fill />
          </TarotCardImageWrapper>

          <TarotCardTitleWrapper>
            <ResultType>{data?.type}</ResultType>
            <Title>
              {TarotData?.nameKR} <br />
              {TarotData?.name}
            </Title>
          </TarotCardTitleWrapper>
        </TarotCard>
        <TarotCardResult>
          <ResultBox>
            <h2> {data?.cardValue.summary}</h2>
            <p> {data?.cardValue.description}</p>
          </ResultBox>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M7.16683 0.767451C7.24703 0.412374 7.75297 0.412372 7.83317 0.76745L8.56813 4.02112C8.61857 4.24443 8.87011 4.35587 9.0694 4.2432L10.8242 3.25114C11.1055 3.09211 11.4299 3.37641 11.3091 3.67613L10.4732 5.75073C10.3945 5.94596 10.5094 6.16518 10.7147 6.21156L14.025 6.95931C14.3801 7.03951 14.3801 7.54545 14.025 7.62565L10.7061 8.37535C10.5037 8.42106 10.3885 8.63509 10.4618 8.82916L11.0591 10.4114C11.1629 10.6864 10.8939 10.9554 10.6189 10.8516L9.03668 10.2543C8.84261 10.181 8.62858 10.2962 8.58287 10.4986L7.83317 13.8175C7.75297 14.1726 7.24703 14.1726 7.16683 13.8175L6.41908 10.5072C6.37271 10.3019 6.15348 10.187 5.95825 10.2656L3.88365 11.1016C3.58393 11.2223 3.29963 10.898 3.45866 10.6167L4.45072 8.86188C4.56339 8.66259 4.45195 8.41105 4.22864 8.36061L0.974971 7.62565C0.619893 7.54545 0.619892 7.03951 0.974969 6.95931L4.24934 6.21968C4.46635 6.17066 4.57932 5.93058 4.47877 5.73212L3.44978 3.70133C3.30058 3.40688 3.6144 3.09307 3.90885 3.24227L5.93964 4.27125C6.1381 4.3718 6.37818 4.25883 6.4272 4.04182L7.16683 0.767451Z"
              fill="#6E7781"
            />
          </svg>

          <ResultBox>
            <h2> {data?.answer.summary}</h2>
            <p> {data?.answer.description}</p>
          </ResultBox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M7.16683 0.767451C7.24703 0.412374 7.75297 0.412372 7.83317 0.76745L8.56813 4.02112C8.61857 4.24443 8.87011 4.35587 9.0694 4.2432L10.8242 3.25114C11.1055 3.09211 11.4299 3.37641 11.3091 3.67613L10.4732 5.75073C10.3945 5.94596 10.5094 6.16518 10.7147 6.21156L14.025 6.95931C14.3801 7.03951 14.3801 7.54545 14.025 7.62565L10.7061 8.37535C10.5037 8.42106 10.3885 8.63509 10.4618 8.82916L11.0591 10.4114C11.1629 10.6864 10.8939 10.9554 10.6189 10.8516L9.03668 10.2543C8.84261 10.181 8.62858 10.2962 8.58287 10.4986L7.83317 13.8175C7.75297 14.1726 7.24703 14.1726 7.16683 13.8175L6.41908 10.5072C6.37271 10.3019 6.15348 10.187 5.95825 10.2656L3.88365 11.1016C3.58393 11.2223 3.29963 10.898 3.45866 10.6167L4.45072 8.86188C4.56339 8.66259 4.45195 8.41105 4.22864 8.36061L0.974971 7.62565C0.619893 7.54545 0.619892 7.03951 0.974969 6.95931L4.24934 6.21968C4.46635 6.17066 4.57932 5.93058 4.47877 5.73212L3.44978 3.70133C3.30058 3.40688 3.6144 3.09307 3.90885 3.24227L5.93964 4.27125C6.1381 4.3718 6.37818 4.25883 6.4272 4.04182L7.16683 0.767451Z"
              fill="#6E7781"
            />
          </svg>

          <ResultBox>
            <h2> {data?.advice.summary}</h2>
            <p> {data?.advice.description}</p>
          </ResultBox>
        </TarotCardResult>

        <BtnWrapper>
          {/* To Do 기능 추가 */}
          <IconBtn>
            결과 저장하기 <DownLoadIcon />
          </IconBtn>
          <Toast.Provider>
            {checkBrowserForWebShare() ? (
              <IconBtn onClick={handleWebShare}>
                링크 복사하기 <LinkIcon />
              </IconBtn>
            ) : (
              <IconBtn onClick={handleShareLink}>
                링크 복사하기 <LinkIcon />
              </IconBtn>
            )}

            <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
              <Toast.Title>링크 복사 완료!</Toast.Title>
            </Toast.Root>
            <Toast.Viewport> </Toast.Viewport>
          </Toast.Provider>
        </BtnWrapper>
        <NextQuestionFlow>
          <AdditionalMessage>
            집사의 고민이 잘 해결되었으면 좋겠다냥! <br /> 궁금한게 있으면 더 물어봐라냥
          </AdditionalMessage>
          <Button color="grey70" onClick={handleContinueConversation}>
            이어서 대화하기
          </Button>
        </NextQuestionFlow>
        <Divider />
        <RecommendBox>
          <SubText>다른 집사들도 타로냥에게 물어봤어요</SubText>
          <MainText>나도 물어보면 좋을 질문</MainText>
          <RecommendContainer>
            {recommendQuestions?.questions.map((item, idx) => (
              <RecommendQuestionBtn
                key={idx}
                onClick={() =>
                  handleContinueRecommendConversation(item.recommendQuestionId, item.question)
                }
              >
                <QuestionCount> {item.referenceCount}명이 질문 중</QuestionCount>
                <QuestionTitle>{item.question} </QuestionTitle>
              </RecommendQuestionBtn>
            ))}
          </RecommendContainer>
        </RecommendBox>
      </TarotResultWrapper>
    );
  }
};

export default TarotResultAfterView;

const NextQuestionFlow = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;

  width: 100%;
`;

const TarotCardTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const TarotCatImage = styled(Image)`
  z-index: 1;
  position: absolute;

  width: 150px;
  height: 223px;

  right: 116px;
  top: 65px;
`;

const TarotCardImageWrapper = styled.div`
  position: relative;
  width: 169px;
  height: 253px;
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
  width: calc(100% + 44px * 2);

  background-color: ${({ theme }) => theme.colors.grey10};

  overflow: hidden;
`;

const AdditionalMessage = styled.p`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grey50};
  text-align: center;
`;
const BtnWrapper = styled.div`
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
  height: fit-content;

  & > div {
    width: 219px;
    height: fit-content;
    display: flex;

    align-items: center;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary01};

    padding: 8px 12px;
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
  height: fit-content;

  gap: 13px;
`;
const ResultBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 4px;

  width: 100%;

  & > h2 {
    ${({ theme }) => theme.fonts.subHead3};
    color: ${({ theme }) => theme.colors.grey90};
    text-align: center;
  }

  & p {
    ${({ theme }) => theme.fonts.body1};
    color: ${({ theme }) => theme.colors.grey60};
    text-align: center;
  }
`;

const ResultType = styled.div`
  padding: 4px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary03};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.subHead2};
`;

const TarotCardResult = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey20};
  background-color: ${({ theme }) => theme.colors.white};

  padding: 20px 24px;
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
  gap: 20px;
`;

const CardImg = styled(Image)`
  position: relative;
`;

const TarotResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
  padding: 32px 20px;

  width: 100%;
  max-width: 600px;
  margin-inline: auto;

  /* @media screen and (max-width: 600px) {
    padding: 0 26px;
  } */
`;
