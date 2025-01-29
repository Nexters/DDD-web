"use client";

import { ReactNode } from "react";
import { css } from "styled-components";

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <main
      css={css`
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      {children}
    </main>
  );
}
