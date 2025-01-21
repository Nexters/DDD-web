'use client';

import { ReactNode } from 'react';
import { css } from 'styled-components';

export default function ResponsiveRootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        margin-inline: auto;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        @media screen and (min-width: 450px) {
          max-width: 600px;
          background-color: rgb(255, 255, 255);
          box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 8px;
        }
      `}
    >
      {children}
    </div>
  );
}
