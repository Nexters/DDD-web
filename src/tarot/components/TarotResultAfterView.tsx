"use client";
import Image from "next/image";
import styled, { css } from "styled-components";
import PopularQuestions from "./PopularQuestion";
import LinkIcon from "@/shared/assets/icons/link.svg";
import ColorStar from "@/shared/assets/icons/tarot-card-result-color-star.svg";
import Star from "@/shared/assets/icons/tarot-card-result-star.svg";
import tarotResultCat from "@/shared/assets/images/tarotResultCat.png";
import tarotResultSummaryCat from "@/shared/assets/images/tarotResultSummaryCat.png";
import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { checkBrowserForWebShare } from "@/shared/utils/checkBrowserForWebShare";
import shareLink from "@/shared/utils/shareLink";
import { useTarotReadingResult } from "@/tarot/hooks/useTarotReadingResult";
import findCardById from "@/tarot/utils/findCardById";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
// import NextRecommendQuestion from "./NextRecommendQuestion";
import PurpleTarotNyang from "@/shared/assets/icons/purple-tarot-nyang.svg";

import LeftAsset from "@/shared/assets/images/downloadImgAsset1.png";
import RightAsset from "@/shared/assets/images/downloadImgAsset2.png";
import DownloadBgImg from "@/shared/assets/images/downloadImgBg.png";

const TarotResultAfterView = () => {
  const { resultId, chatId } = useParams<{
    resultId: string;
    chatId: string;
  }>();

  const [toastOpen, setToastOpen] = useState(false);
  const shareURL = window.location.href;
  const { handleWebShare, handleCopyToClipboard } = shareLink(shareURL);
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

  // const handleRecommendQuestionChat = (recommendQuestionId: number, message: string) => {
  //   const object: SendChatMessageRequest = {
  //     roomId: Number(chatId),
  //     referenceQuestionId: recommendQuestionId,
  //     intent: "RECOMMEND_QUESTION",
  //     message: message,
  //   };

  //   queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
  //   router.push(`/chats/${chatId}?message=${JSON.stringify(object)}`);
  // };

  const handleNewChat = () => {
    router.push("/");
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
            <PreviewTextWrapper>{data.summary}</PreviewTextWrapper>

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

        <DownloadImageWrapper id="downloadableContent" imgSrc={DownloadBgImg.src}>
          <DownLoadImageContainer>
            <Image src={TarotData.imgSrc} alt="뽑힌 카드 이미지" width={187} height={279} />
            <div
              css={css`
                display: flex;
                width: 100%;
                justify-content: space-between;
              `}
            >
              <LeftAssetWrapper
                src={LeftAsset}
                width={95}
                height={95}
                alt="다운로드 카드 이미지 왼쪽 에셋"
              />
              <RightAssetWrapper
                src={RightAsset}
                width={61}
                height={100}
                alt="다운로드 카드 이미지 오른쪽 에셋"
              />
            </div>
          </DownLoadImageContainer>
          <DownloadInfoWrapper>
            <DownloadImageChip>{data?.type}</DownloadImageChip>
            <DownloadImageTitle>
              {TarotData?.nameKR} <br />
              {TarotData?.name}
            </DownloadImageTitle>
            <DownloadTarotCardDescWrapper>
              <PurpleTarotNyang />
              <ResultSummaryDesc> {data.summary}</ResultSummaryDesc>
              <ResultCardDesc> {data?.cardValue.description}</ResultCardDesc>
            </DownloadTarotCardDescWrapper>

            <DownloadImgInstaChip> www.tarotmeow.vercel.app/</DownloadImgInstaChip>
          </DownloadInfoWrapper>
        </DownloadImageWrapper>

        {data.isOwner ? (
          <BtnWrapper>
            <Toast.Provider>
              <IconBtn onClick={checkBrowserForWebShare() ? handleWebShare : handleShareLink}>
                링크 복사하기 <LinkIcon />
              </IconBtn>

              <Toast.Root open={toastOpen} onOpenChange={setToastOpen}>
                <Toast.Title>링크 복사 완료!</Toast.Title>
              </Toast.Root>
              <Toast.Viewport />
            </Toast.Provider>
          </BtnWrapper>
        ) : null}

        <NextQuestionFlow>
          <AdditionalMessage>
            {data.isOwner ? (
              <>
                집사의 고민이 잘 해결되었으면 좋겠다냥! <br /> 궁금한게 있으면 더 물어봐라냥
              </>
            ) : (
              "다른 집사의 타로 결과를 구경했다냥! 나는 어떤 결과가 나올지, 궁금하지 않냥?"
            )}
          </AdditionalMessage>

          {data.isOwner ? (
            <Button color="grey70" onClick={handleContinueConversation}>
              이어서 대화하기
            </Button>
          ) : (
            <Button color="grey70" onClick={handleNewChat}>
              나도 대화하기
            </Button>
          )}
        </NextQuestionFlow>
        {/* {/<Divider /> */}

        {/* {data?.isOwner ? (
          <>
            <NextRecommendQuestion handleRecommendQuestionChat={handleRecommendQuestionChat} />
            <Divider />
          </>
        ) : null} */}

        <PopularQuestions />
      </TarotResultWrapper>
    );
  }
};
export default TarotResultAfterView;

const DownloadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 44px;
`;
const DownLoadImageContainer = styled.div`
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DownloadImgInstaChip = styled.div`
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 100px;
  width: 200px;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.primary03};

  position: relative;
  top: 20px;
`;

const ResultSummaryDesc = styled.p`
  ${({ theme }) => theme.fonts.subHead4};
  color: ${({ theme }) => theme.colors.primary03};
`;

const ResultCardDesc = styled.p`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grey60};
`;

const DownloadTarotCardDescWrapper = styled.div`
  display: flex;
  width: 335px;

  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const DownloadImageTitle = styled.h2`
  margin: 16px 0 28px;
  text-align: center;
  ${({ theme }) => theme.fonts.subHead4};
  color: ${({ theme }) => theme.colors.black};
`;

const DownloadImageChip = styled.div`
  display: inline;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primary03};

  padding: 4px 16px;
  ${({ theme }) => theme.fonts.subHead2};
  color: ${({ theme }) => theme.colors.primary00};
`;

const DownloadImageWrapper = styled.div<{ imgSrc: string }>`
  z-index: -1;
  width: 375px;
  height: fit-content;
  position: absolute;

  top: 0;
  left: 0;
  background-image: url(${(props) => (props ? props.imgSrc : "")});
`;

const LeftAssetWrapper = styled(Image)`
  position: relative;
  bottom: 40px;
  left: 40px;
`;

const RightAssetWrapper = styled(Image)`
  position: relative;
  bottom: 44px;
  right: 66px;
`;

const TarotCatSummaryImage = styled(Image)`
  position: absolute;
  right: -12.5px;
  bottom: 5px;
`;

const PreviewTextWrapper = styled.div`
  width: 90%;
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
  background-color: white;
`;
