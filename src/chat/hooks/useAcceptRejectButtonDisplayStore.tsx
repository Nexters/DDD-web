import { createContext, ReactNode, useContext, useState } from "react";

type AcceptRejectButtonDisplayContextType = {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
};

const AcceptRejectButtonDisplayContext = createContext<AcceptRejectButtonDisplayContextType | null>(
  null
);

export const useAcceptRejectButtonDisplayContext = () => {
  const context = useContext(AcceptRejectButtonDisplayContext);
  if (!context) throw new Error("AcceptRejectButtonDisplayContext not found");
  return context;
};

export const AcceptRejectButtonDisplayProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <AcceptRejectButtonDisplayContext.Provider value={{ isVisible, show, hide }}>
      {children}
    </AcceptRejectButtonDisplayContext.Provider>
  );
};
