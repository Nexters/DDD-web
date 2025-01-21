'use client';

import { ReactNode } from 'react';
import { css } from 'styled-components';

interface HeaderContentProps {
  children: ReactNode;
  /**
   * 시작 부분에 표시할 요소입니다.
   */
  startAction?: ReactNode;
  /**
   * 끝 부분에 표시할 요소입니다.
   */
  endAction?: ReactNode;
  /**
   * true일 경우 헤더가 스티키 포지션으로 고정됩니다. (top: 0)
   */
  sticky?: boolean;
}

export default function HeaderContent({ children, startAction, endAction, sticky }: HeaderContentProps) {
  return (
    <header
      css={css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        ${sticky && `position: sticky; top: 0;`}
      `}
    >
      {startAction ? startAction : <span role="presentation" />}
      {children}
      {endAction ? endAction : <span role="presentation" />}
    </header>
  );
}
