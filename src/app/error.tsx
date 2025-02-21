"use client";
import InternalServerErrorImage from "@/shared/assets/images/500.png";
import Button from "@/shared/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { css } from "styled-components";

export default function Error() {
  const router = useRouter();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 150px;

        width: 100%;
        max-width: 600px;
        margin-inline: auto;
      `}
    >
      <Image
        src={InternalServerErrorImage}
        alt=""
        style={{ width: "100%", height: "100%" }}
        css={css`
          aspect-ratio: 376 / 328;
        `}
      />
      <Button
        color="grey70"
        css={css`
          width: 107px;
          margin-inline: auto;
          margin-top: 12px;
        `}
        onClick={() => router.push("/")}
      >
        돌아가기
      </Button>
    </div>
  );
}
