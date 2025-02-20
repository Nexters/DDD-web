import loadingAnimation from "@/shared/assets/lotties/loading-cat.json";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Lottie from "lottie-react";
import { css } from "styled-components";
import Modal from "./Modal";
interface LoadingModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LoadingModal({ isOpen, onOpenChange }: LoadingModalProps) {
  return (
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            background-color: transparent;
            &:focus-visible {
              outline: none;
            }
          `}
        >
          <VisuallyHidden>
            <Modal.Title>로딩중입니다.</Modal.Title>
            <Modal.Description>잠시만 기다려주세요.</Modal.Description>
          </VisuallyHidden>

          <Lottie animationData={loadingAnimation} loop={true} style={{ height: 500 }} />
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}
