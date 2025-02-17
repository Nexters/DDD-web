"use client";

import CatImage from "@/shared/assets/images/catInResultsPage.png";
import Button from "@/shared/components/Button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { css } from "styled-components";
import { useTarotReadingResultList } from "../hooks/useTarotReadingResultList";
export default function TarotResults() {
  const { data } = useTarotReadingResultList();
  const router = useRouter();
  const { chatId } = useParams();

  if (!data) return null;

  return (
    <div
      css={css`
        width: 100%;
        max-width: 600px;
        margin-inline: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 180px;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 36px;
          `}
        >
          <Image src={CatImage} alt="" width={206} height={169} />
          <p
            css={css`
              ${({ theme }) => theme.fonts.headline1};
              color: ${({ theme }) => theme.colors.grey70};
            `}
          >
            아직 본 타로 결과가 없다냥
          </p>
        </div>
        <Button
          color="grey70"
          css={css`
            width: 140px;
            height: 54px;
          `}
          onClick={() => {
            router.push(`/chats/${chatId}`);
          }}
        >
          지금 타로 보기
        </Button>
      </div>
    </div>
  );
}
