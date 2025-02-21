"use client";

import FolderIcon from "@/shared/assets/icons/folder.svg";
import KebobMenuIcon from "@/shared/assets/icons/kebab-menu.svg";
import MessageSquarePlusIcon from "@/shared/assets/icons/message-square-plus.svg";
import ShareIcon from "@/shared/assets/icons/share.svg";
import BottomSheet from "@/shared/components/BottomSheet";
import HeaderContent from "@/shared/components/HeaderContent";
import Toast from "@/shared/components/Toast";
import { checkBrowserForWebShare } from "@/shared/utils/checkBrowserForWebShare";
import shareLink from "@/shared/utils/shareLink";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "styled-components";
import { useCreateChatRoom } from "../hooks/useCreateChatRoom";
import CreateChatRoomModal from "./CreateChatRoomModal";

export default function ChatHeader() {
  const { mutate: createChatRoom } = useCreateChatRoom();
  const router = useRouter();
  const [isCreateChatRoomModalOpen, setIsCreateChatRoomModalOpen] = useState(false);

  const { handleWebShare, handleCopyToClipboard } = shareLink(
    process.env.NEXT_PUBLIC_BASE_URL || "https://tarotnyang.me"
  );
  const [toastOpen, setToastOpen] = useState(false);
  const { chatId } = useParams();

  const handleResetChatClick = () => {
    createChatRoom(undefined, {
      onSuccess: (data) => {
        router.push(`/chats/${data.roomId}`);
      },
    });
  };

  const handleCreateChatRoomClick = () => {
    setIsCreateChatRoomModalOpen(true);
  };

  const handleTarotResultsClick = () => {
    router.push(`/chats/${chatId}/tarot-reading`);
  };

  const handleShare = async () => {
    if (checkBrowserForWebShare()) {
      handleWebShare();
    } else {
      const shareSuccess = await handleCopyToClipboard();
      if (shareSuccess) {
        setToastOpen(true);
      }
    }
  };

  return (
    <HeaderContent
      sticky
      divider
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
                <BottomSheet.Description>
                  외부를 클릭하면 닫힙니다. 원하는 작업을 선택하세요.
                </BottomSheet.Description>
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
                  <button
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    `}
                    type="button"
                    onClick={handleShare}
                  >
                    <ShareIcon />
                    친구에게 타로냥 알리기
                  </button>
                </li>
                <li>
                  <button
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    `}
                    type="button"
                    onClick={handleTarotResultsClick}
                  >
                    <FolderIcon />
                    지난 결과 모아보기
                  </button>
                </li>
                <li>
                  <button
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    `}
                    type="button"
                    onClick={handleCreateChatRoomClick}
                  >
                    <MessageSquarePlusIcon />새 대화 시작하기
                  </button>
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
        <Toast.Provider>
          <Toast.Root open={toastOpen} onOpenChange={setToastOpen} duration={3000}>
            <Toast.Title>링크 복사 완료! 친구에게 링크를 전송해 주세요.</Toast.Title>
          </Toast.Root>
          <Toast.Viewport />
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
        </Toast.Provider>
      </h1>
      <CreateChatRoomModal
        isOpen={isCreateChatRoomModalOpen}
        onOpenChange={setIsCreateChatRoomModalOpen}
        onCreateChatRoomClick={handleResetChatClick}
      />
    </HeaderContent>
  );
}
