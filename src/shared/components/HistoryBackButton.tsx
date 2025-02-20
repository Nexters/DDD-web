"use client";

import ChevronLeftIcon from "@/shared/assets/icons/chevron-left.svg";
import { useRouter } from "next/navigation";
import { css } from "styled-components";

export default function HistoryBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      css={css`
        display: flex;
      `}
    >
      <ChevronLeftIcon />
    </button>
  );
}
