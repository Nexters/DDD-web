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
        }
      `}
    >
      {children}
    </div>
  );
}
