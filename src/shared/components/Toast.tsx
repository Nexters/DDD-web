import * as Toast from "@radix-ui/react-toast";
import styled from "styled-components";

const ToastProvider = Toast.Provider;

const StyledToastRoot = styled(Toast.Root)`
  background-color: ${({ theme }) => theme.colors.grey70};
  padding: 8px 16px;
  border-radius: 40px;
  opacity: 0.9;
`;

const ToastTitle = Toast.Title;
const ToastDescription = Toast.Description;
const ToastAction = Toast.Action;
const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  top: 3px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  text-align: center;
  flex-direction: column;
  max-width: 268px;
  color: ${({ theme }) => theme.colors.white};
  word-break: keep-all;
  ${({ theme }) => theme.fonts.body2};
`;

export default {
  Provider: ToastProvider,
  Root: StyledToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Viewport: ToastViewport,
};
