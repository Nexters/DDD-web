"use client";

import { ReactNode } from "react";
import { css } from "styled-components";
import zIndex from "../constants/zIndex";
import FullscreenOverflowDivider from "./FullscreenOverflowDivider";

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

export default function HeaderContent({
  children,
  startAction,
  endAction,
  sticky,
  divider,
}: HeaderContentProps) {
  return (
    <div
      css={css`
        width: 100%;
        ${sticky && `position: sticky; top: 0; z-index: ${zIndex.header}; background-color: white;`}
      `}
    >
      <header
        css={css`
          position: relative;
          padding: 14px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          max-width: 600px;
          width: 100%;
          margin-inline: auto;
        `}
      >
        {startAction ? (
          startAction
        ) : (
          <span
            role="presentation"
            css={css`
              width: 24px;
            `}
          />
        )}
        {children}
        {endAction ? (
          endAction
        ) : (
          <span
            role="presentation"
            css={css`
              width: 24px;
            `}
          />
        )}
      </header>
      {divider && <FullscreenOverflowDivider />}
    </div>
  );
}
