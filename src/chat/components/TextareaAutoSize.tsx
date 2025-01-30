"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { RefObject, useState } from "react";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import { css } from "styled-components";

type Props = {
  disabled?: boolean;
  maxLength: number;
  value: string;
  textareaRef?: RefObject<HTMLTextAreaElement>;
} & TextareaAutosizeProps;

export default function TextareaAutoSize({
  value,
  onChange,
  disabled,
  placeholder,
  maxLength,
  autoFocus,
  textareaRef,
}: Props) {
  const textareaMinHeight = 52;
  const [isSingleLineTextarea, setIsSingleLineTextarea] = useState(true);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={value.length === maxLength}>
        <Tooltip.Trigger asChild>
          <TextareaAutosize
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            minRows={1}
            maxRows={8}
            autoFocus={autoFocus}
            ref={textareaRef}
            onHeightChange={(height) => {
              const isSingleLine = height <= textareaMinHeight;
              setIsSingleLineTextarea(isSingleLine);
            }}
            css={css`
              border: none;
              resize: none;
              padding: 10px 56px 10px 12px;
              width: 100%;
              height: ${isSingleLineTextarea ? `${textareaMinHeight}px` : "auto"};
              min-height: ${textareaMinHeight}px;
              border-radius: 8px;
              ${({ theme }) => theme.fonts.body3}
              line-height: ${isSingleLineTextarea ? "32px" : "24px"};
              background-color: ${({ theme }) => theme.colors.grey00};
              color: ${({ theme }) => theme.colors.grey90};
              caret-color: ${({ theme }) => theme.colors.grey90};
              &::placeholder {
                color: ${({ theme }) => theme.colors.grey30};
              }
              &:focus-visible {
                outline: none;
              }
              ${disabled &&
              css`
                color: ${({ theme }) => theme.colors.grey40};
                background-color: ${({ theme }) => theme.colors.grey10};
              `}
            `}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            css={css`
              background-color: ${({ theme }) => theme.colors.grey90};
              color: ${({ theme }) => theme.colors.white};
              padding: 6px 8px;
              border-radius: 8px;
              ${({ theme }) => theme.fonts.body1}
              text-align: center;
            `}
          >
            <Tooltip.Arrow
              width={16}
              height={10}
              css={css`
                fill: ${({ theme }) => theme.colors.grey90};
              `}
            />
            미안하지만 고양이가 알아들을 수 있는
            <br />
            글자 수는 300자까지야 냥
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
