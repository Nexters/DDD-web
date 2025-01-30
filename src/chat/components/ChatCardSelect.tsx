import styled from "styled-components";
import * as motion from "motion/react-client";
import { easeInOut } from "motion";

import Card from "./Card";
import { useState } from "react";
interface PropTypes {
  onClick: () => void;
}

type CardState = "Deck" | "Spread" | "Pick";

const RiseUpCardDeck = {
  duration: 0.6,
  ease: easeInOut,
};

const ChatCardSelect = ({ onClick }: PropTypes) => {
  const [cardState, setCardState] = useState<CardState>("Deck");
  return (
    <CardDeckWrapper
      initial={{ opacity: 0, y: 200 }}
      //추후 0으로 변경 하고 parents에서 위치 조절
      animate={{ opacity: 1, y: -20 }}
      transition={RiseUpCardDeck}
      onAnimationComplete={() => setCardState("Spread")}
    >
      {Array.from({ length: 12 }).map((_, idx) => (
        <Card key={idx} idx={idx} />
      ))}
    </CardDeckWrapper>
  );
};

export default ChatCardSelect;

const CardDeckWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;

  position: relative;
  overflow: hidden;
`;
