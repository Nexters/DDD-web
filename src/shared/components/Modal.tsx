import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const overlaySlow = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 0.4;
	}
`;

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Root = ({ isOpen, onOpenChange, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

const Trigger = Dialog.Trigger;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 319px;
  height: fit-content;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  animation: ${overlaySlow} 200ms;
`;

const Title = styled(Dialog.Title)`
  text-align: center;
  ${({ theme }) => theme.fonts.body3};
  ${({ theme }) => theme.colors.grey90};
`;

const Description = styled(Dialog.Description)`
  text-align: center;
  ${({ theme }) => theme.fonts.body3};
  ${({ theme }) => theme.colors.grey90};
`;

const Modal = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
};

export default Modal;
