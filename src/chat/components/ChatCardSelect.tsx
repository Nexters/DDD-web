import styled from "styled-components";
import * as motion from "motion/react-client";
import { easeInOut } from "motion";
import Card from "./Card";
import { useState, useEffect, useRef } from "react";
import { DeckState } from "../models/DeckState";
import { CardPickState } from "../models/CardPickState";
interface PropTypes {
  /** 타입 변경 필요 */
  onClick?: () => void;
}

const riseUpCardDeck = {
  duration: 0.6,
  ease: easeInOut,
};

const ChatCardSelect = ({}: PropTypes) => {
  const [deckState, setDeckState] = useState<DeckState>("Stack");
  const ITEMS_PER_LOAD = 15;
  const [items, setItems] = useState<CardPickState[]>(
    Array.from({ length: ITEMS_PER_LOAD }, () => "Default")
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleClickCard = (index: number) => {
    /** 첫번째 선택시 Card Pick animation을 위한 상태변경 */
    if (deckState === "Spread") {
      setItems((prevItems) =>
        prevItems.map((_, i) => (i === index ? "Pick" : "Down"))
      );
    }
    /** Pick된 카드 최종 선택시 타로 선택 API 호출 */
    if (items[index] === "Pick") {
      alert("Card Select!");
      //onClick();
    }
  };

  /** Trigger observe 무한스크롤 */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setItems((prev) => [
              ...prev,
              ...Array.from(
                { length: ITEMS_PER_LOAD },
                () => "Default" as CardPickState
              ),
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
    >
      {items.map((_, idx) => (
        <Card
          key={idx}
          idx={idx}
          deckState={deckState}
          setDeckState={setDeckState}
          onClick={handleClickCard}
          cardPickState={items}
        />
      ))}

      <InfinteScrollTrigger ref={observerRef} pos={items.length} />
    </CardDeckWrapper>
  );
};

export default ChatCardSelect;

const InfinteScrollTrigger = styled.div<{ pos: number }>`
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
