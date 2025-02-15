"use client";
import Image from "next/image";
import styled, { useTheme } from "styled-components";

import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";

import findCardById from "@/tarot/utils/findCardById";
import { useParams } from "next/navigation";

import { SendChatMessageRequest } from "@/chat/apis/sendChatMessage";
import DownLoadIcon from "@/shared/assets/icons/download.svg";
import LinkIcon from "@/shared/assets/icons/link.svg";
import Star from "@/shared/assets/icons/tarot-card-result-star.svg";
import ColorStar from "@/shared/assets/icons/tarot-card-result-color-star.svg";
import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { checkBrowserForWebShare } from "@/shared/utils/checkBrowserForWebShare";
import shareLink from "@/shared/utils/shareLink";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import tarotResultCat from "@/shared/assets/images/tarotResultCat.png";
import tarotResultSummaryCat from "@/shared/assets/images/tarotResultSummaryCat.png";

const TarotResultAfterView = () => {
  const { resultId, chatId } = useParams<{
    resultId: string;
    chatId: string;
  }>();

  const [toastOpen, setToastOpen] = useState(false);
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

  const handleRecommendQuestionChat = (recommendQuestionId: number, message: string) => {
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
        <TarotCardResultWrapper>
          <TarotCardResultSummary>
            <ColorStar />
            <PreviewTextWrapper>
              123이어지는123이어지는123이어지는123이어지는123이어지는
            </PreviewTextWrapper>

            <TarotCatSummaryImage
              src={tarotResultSummaryCat}
              width={68}
              height={60}
              alt="결과 요약 고양이 이미지"
            />
          </TarotCardResultSummary>
          <TarotCardResult>
            <ResultBox>
              <h2> {data?.cardValue.summary}</h2>
              <p> {data?.cardValue.description}</p>
            </ResultBox>

            <Star />
            <ResultBox>
              <h2> {data?.answer.summary}</h2>
              <p> {data?.answer.description}</p>
            </ResultBox>
            <Star />

            <ResultBox>
              <h2> {data?.advice.summary}</h2>
              <p> {data?.advice.description}</p>
            </ResultBox>
          </TarotCardResult>
        </TarotCardResultWrapper>

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
      </TarotResultWrapper>
    );
  }
};

export default TarotResultAfterView;

const TarotCatSummaryImage = styled(Image)`
  position: absolute;
  right: -12.5px;
  bottom: 5px;
`;

const PreviewTextWrapper = styled.div`
  width: 230px;
  display: flex;
  text-align: center;
  height: fit-content;

  color: ${({ theme }) => theme.colors.primary03};
  ${({ theme }) => theme.fonts.subHead3};
`;

const TarotCardResultSummary = styled.div`
  position: relative;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border: 1px solid ${({ theme }) => theme.colors.primary02};
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.primary00};
`;
const TarotCardResultWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

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

const Divider = styled.div`
  height: 11px;
  width: calc(100% + 20px * 2);

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
