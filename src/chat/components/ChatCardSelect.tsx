import styled from "styled-components";
import * as motion from "motion/react-client";
import { easeInOut } from "motion";
import Card from "./Card";
import { useState, useEffect, useRef } from "react";
interface PropTypes {
  onClick: () => void;
}

type CardState = "Deck" | "Spread" | "Pick";

const riseUpCardDeck = {
  duration: 0.6,
  ease: easeInOut,
};

const ChatCardSelect = ({ onClick }: PropTypes) => {
  const [cardState, setCardState] = useState<CardState>("Deck");
  const [cardDeckAnimation, setCardDeckAnimation] = useState(true);

  const ITEMS_PER_LOAD = 15;
  const [items, setItems] = useState<number[]>(
    Array.from({ length: ITEMS_PER_LOAD }, (_, i) => i)
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: ITEMS_PER_LOAD }, (_, i) => i),
            ]);
          }
        });
      },
      { root: null, threshold: 0.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <CardDeckWrapper
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={riseUpCardDeck}
      onAnimationComplete={() => setCardState("Spread")}
    >
      {items.map((_, idx) => (
        <Card
          key={idx}
          idx={idx}
          cardDeckAnimation={cardDeckAnimation}
          setCardDeckAnimation={setCardDeckAnimation}
        />
      ))}

      <Temp ref={observerRef} pos={items.length} />
    </CardDeckWrapper>
  );
};

export default ChatCardSelect;

const Temp = styled.div<{ pos: number }>`
  width: 100px;
  height: 160px;

  background-color: transparent;

  position: absolute;
  left: ${({ pos }) => pos * 50}px;
`;
const CardDeckWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;
  position: relative;
  overflow-x: scroll;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  & > .no-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
