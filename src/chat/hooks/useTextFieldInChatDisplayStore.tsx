import { createContext, ReactNode, useContext, useRef, useState } from "react";

type TextFieldInChatDisplayContextType = {
  isVisible: boolean;
  isDisabled: boolean;
  show: () => void;
  hide: () => void;
  disable: () => void;
  enable: () => void;
  focus: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const TextFieldInChatDisplayContext = createContext<TextFieldInChatDisplayContextType | null>(null);

export const useTextFieldInChatDisplayContext = () => {
  const context = useContext(TextFieldInChatDisplayContext);
  if (!context) {
    throw new Error("useTextFieldInChatDisplayContext는 TextFieldInChatDisplayProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

export const TextFieldInChatDisplayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const enable = () => setIsDisabled(false);
  const disable = () => setIsDisabled(true);
  const focus = () => {
    textareaRef.current?.focus();
  };

  return (
    <TextFieldInChatDisplayContext.Provider
      value={{ isVisible, isDisabled, show, hide, enable, disable, focus, textareaRef }}
    >
      {children}
    </TextFieldInChatDisplayContext.Provider>
  );
};
