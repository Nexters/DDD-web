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
  /**
   * 헤더 구분선 표시 여부
   */
  divider?: boolean;
}

export default function HeaderContent({ children, startAction, endAction, sticky, divider }: HeaderContentProps) {
  return (
    <>
      <header
        css={css`
          position: relative;
          padding: 14px 20px;
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
      {divider && (
        <hr
          css={css`
            margin: 0;
            block-size: 1px;
            border: none;
            width: 100%;
            background-color: ${(props) => props.theme.colors.grey10};
            box-shadow: 0 0 0 100vmax ${(props) => props.theme.colors.grey10};
            clip-path: inset(0px -100vmax);
          `}
        />
      )}
    </>
  );
}
