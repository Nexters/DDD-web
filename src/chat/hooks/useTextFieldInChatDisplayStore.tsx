import { createContext, ReactNode, useContext, useState } from "react";

type TextFieldInChatDisplayContextType = {
  isVisible: boolean;
  isDisabled: boolean;
  show: () => void;
  hide: () => void;
  disable: () => void;
  enable: () => void;
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

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const enable = () => setIsDisabled(false);
  const disable = () => setIsDisabled(true);

  return (
    <TextFieldInChatDisplayContext.Provider value={{ isVisible, isDisabled, show, hide, enable, disable }}>
      {children}
    </TextFieldInChatDisplayContext.Provider>
  );
};
