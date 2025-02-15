import { useTarotReadingResult } from "../hooks/useTarotReadingResult";
import findCardById from "@/tarot/utils/findCardById";
import { useParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import ResultDownloadBackground from "@/shared/assets/images/ReslutDownloadBg.png";
import { StaticImageData } from "next/image";
import { TarotCardType } from "../types/tarotCard";
interface DownloadTarotResult {
  tarotData: TarotCardType;
}

const DownloadTarotResult = ({ tarotData }: DownloadTarotResult) => {
  const { resultId, chatId } = useParams<{
    resultId: string;
    chatId: string;
  }>();
  const { data, isError } = useTarotReadingResult(Number(resultId));

  return (
    <ResultCardWrapper imageSrc={ResultDownloadBackground.src}>
      <ResultInfo>
        <CardImg src={tarotData?.imgSrc} alt={"타로카드 이미지"} />
        <Title>
          {tarotData?.nameKR} <br />
          {tarotData?.name}
        </Title>
        <DescriptionWrapper>
          <Summary> {data?.cardValue.summary}</Summary>
          <Description> {data?.cardValue.description}</Description>
        </DescriptionWrapper>
        <InstaChip>타로냥 @ insta_tarot_nyang</InstaChip>
      </ResultInfo>
    </ResultCardWrapper>
  );
};

export default DownloadTarotResult;

const InstaChip = styled.div`
  background-color: ${({ theme }) => theme.colors.grey10};
  border-radius: 100px;
  padding: 4px 12px;
  ${({ theme }) => theme.colors.grey50};

  ${({ theme }) => theme.fonts.body1};

  margin-top: 87px;
  margin-bottom: 34px;
`;

const Summary = styled.p`
  ${({ theme }) => theme.fonts.subHead3};
  color: ${({ theme }) => theme.colors.black};
`;

const Description = styled.p`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grey80};
`;

const DescriptionWrapper = styled.section`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 279px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  text-align: center;
  ${({ theme }) => theme.fonts.subHead4};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 35px;
  margin-top: 18px;
`;

const CardImg = styled(Image)`
  width: 223px;
  height: 334px;
  border-radius: 16px;
  margin-top: 119px;
`;

const ResultCardWrapper = styled.div<{ imageSrc: string }>`
  width: 375px;
  height: fit-content;

  background-image: url(${(props) => (props ? props.imageSrc : "")});
`;

const ResultInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
