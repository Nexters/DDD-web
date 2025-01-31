import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { css, keyframes, styled, useTheme } from "styled-components";
import Modal from "./Modal";

interface LoadingModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LoadingModal({ isOpen, onOpenChange }: LoadingModalProps) {
  const theme = useTheme();
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

          <Dot $delay={0} $color={theme.colors.primary01} />
          <Dot $delay={0.3} $color={theme.colors.primary02} />
          <Dot $delay={0.6} $color={theme.colors.primary03} />
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Dot = styled.span<{ $delay: number; $color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${fadeInOut} 1.5s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;
