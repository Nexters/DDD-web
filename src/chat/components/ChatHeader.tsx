"use client";

import KebobMenuIcon from "@/shared/assets/icons/kebab-menu.svg";
import BottomSheet from "@/shared/components/BottomSheet";
import HeaderContent from "@/shared/components/HeaderContent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { css } from "styled-components";

export default function ChatHeader() {
  return (
    <HeaderContent
      divider
      sticky
      endAction={
        <BottomSheet.Root>
          <BottomSheet.Trigger asChild>
            <button type="button" aria-label="메뉴">
              <KebobMenuIcon
                width={24}
                height={24}
                css={css`
                  display: block;
                `}
              />
            </button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <VisuallyHidden>
                <BottomSheet.Title>메뉴</BottomSheet.Title>
                <BottomSheet.Description>외부를 클릭하면 닫힙니다. 원하는 작업을 선택하세요.</BottomSheet.Description>
              </VisuallyHidden>
              <ul
                css={css`
                  & > li > button {
                    ${({ theme }) => theme.fonts.subHead3}
                    color: ${({ theme }) => theme.colors.grey90};
                    padding: 16px 24px;
                    width: 100%;
                    text-align: left;
                  }
                `}
              >
                <li>
                  {/* TODO: 메뉴 버튼 액션 추가 */}
                  <button type="button">친구에게 타로냥 알리기</button>
                </li>
                <li>
                  {/* TODO: 메뉴 버튼 액션 추가 */}
                  <button type="button">새 대화 시작하기</button>
                </li>
              </ul>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet.Root>
      }
    >
      <h1
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}
      >
        <span
          css={css`
            ${({ theme }) => theme.fonts.subHead3}
            color: ${({ theme }) => theme.colors.grey90};
          `}
        >
          타로냥
        </span>
        <span
          css={css`
            padding-inline: 8px;
            ${({ theme }) => theme.fonts.subHead1}
            color: ${({ theme }) => theme.colors.primary03};
            background-color: ${({ theme }) => theme.colors.primary00};
            border-radius: 40px;
          `}
        >
          AI
        </span>
      </h1>
    </HeaderContent>
  );
}
