"use client";

import { css } from "styled-components";

export default function FullscreenOverflowDivider() {
  return (
    <hr
      css={css`
        margin: 0;
        block-size: 1px;
        border: none;
        width: 100%;
        background-color: ${(props) => props.theme.colors.grey10};
        box-shadow: 0 0 0 100vmax ${(props) => props.theme.colors.grey10};
        clip-path: inset(0px -100vmax);
        flex-shrink: 0;
      `}
    />
  );
}
