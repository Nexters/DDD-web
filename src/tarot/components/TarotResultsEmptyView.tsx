import TarotResultsCatImage from "@/shared/assets/images/tarotResultsCat.png";
import Button from "@/shared/components/Button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { css } from "styled-components";

export default function TarotResultsEmptyView() {
  const router = useRouter();
  const { chatId } = useParams();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 78px;
        gap: 12px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Image
          src={TarotResultsCatImage}
          alt=""
          height={329}
          css={css`
            width: 100%;
            object-fit: cover;
          `}
        />
        <p
          css={css`
            ${({ theme }) => theme.fonts.headline1};
            color: ${({ theme }) => theme.colors.grey70};
            text-align: center;
          `}
        >
          아직 본 결과가 없어요
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
  );
}
