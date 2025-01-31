import * as RadixToast from "@radix-ui/react-toast";
import styled from "styled-components";
import zIndex from "../constants/zIndex";
const ToastProvider = RadixToast.Provider;

const StyledToastRoot = styled(RadixToast.Root)`
  background-color: ${({ theme }) => theme.colors.grey70};
  padding: 8px 16px;
  border-radius: 40px;
  opacity: 0.9;
`;

const ToastTitle = RadixToast.Title;
const ToastDescription = RadixToast.Description;
const ToastAction = RadixToast.Action;
const ToastViewport = styled(RadixToast.Viewport)`
  position: fixed;
  top: 3px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  text-align: center;
  flex-direction: column;
  max-width: 268px;
  z-index: ${zIndex.toast};
  color: ${({ theme }) => theme.colors.white};
  word-break: keep-all;
  ${({ theme }) => theme.fonts.body2};
`;

const Toast = {
  Provider: ToastProvider,
  Root: StyledToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Viewport: ToastViewport,
};

export default Toast;
