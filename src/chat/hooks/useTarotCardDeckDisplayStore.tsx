import { createContext, ReactNode, useContext, useState } from "react";

type TarotCardDeckDisplayContextType = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

const TarotCardDeckDisplayContext = createContext<TarotCardDeckDisplayContextType | null>(null);

export const useTarotCardDeckDisplayContext = () => {
  const context = useContext(TarotCardDeckDisplayContext);
  if (!context) {
    throw new Error("useTarotCardDeckDisplayContext는 TarotCardDeckDisplayProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

export const TarotCardDeckDisplayDisplayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <TarotCardDeckDisplayContext.Provider value={{ isVisible, show, hide }}>
      {children}
    </TarotCardDeckDisplayContext.Provider>
  );
};
