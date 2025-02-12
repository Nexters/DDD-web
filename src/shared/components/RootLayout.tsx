"use client";

import { ReactNode } from "react";
import { css } from "styled-components";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        margin-inline: auto;
        min-height: 100dvh;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
}
