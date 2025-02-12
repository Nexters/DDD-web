import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { css } from "styled-components";
interface CreateChatRoomModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreateChatRoomClick: () => void;
}

export default function CreateChatRoomModal({
  isOpen,
  onOpenChange,
  onCreateChatRoomClick,
}: CreateChatRoomModalProps) {
  return (
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <VisuallyHidden>
            <Modal.Title>새 대화 시작하기</Modal.Title>
          </VisuallyHidden>
          <Modal.Description>
            새 대화를 시작하면 타로냥과 나눈
            <br /> 대화 기록이 모두 사라져요.
            <br /> 새로 시작할까요?
          </Modal.Description>
          <div
            css={css`
              display: flex;
              gap: 8px;
              margin-top: 24px;
            `}
          >
            <Modal.Close asChild>
              <Button
                type="button"
                color="grey10"
                css={css`
                  flex-shrink: initial;
                `}
              >
                머무르기
              </Button>
            </Modal.Close>

            <Button
              type="button"
              color="grey70"
              onClick={onCreateChatRoomClick}
              css={css`
                flex-shrink: initial;
              `}
            >
              시작하기
            </Button>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
