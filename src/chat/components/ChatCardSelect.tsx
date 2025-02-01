import LoadingModal from "@/shared/components/LoadingModal";
import tarotDeckData from "@/tarot/constants/tarotCardDeck";
import { useSelectTarotCard } from "@/tarot/hooks/useSelectTarotCard";
import { easeInOut } from "motion";
import * as motion from "motion/react-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CardPickState } from "../models/CardPickState";
import { DeckState } from "../models/DeckState";
import Card from "./Card";

const riseUpCardDeck = {
  duration: 0.6,
  ease: easeInOut,
};

const ChatCardSelect = () => {
  const [deckState, setDeckState] = useState<DeckState>("Stack");
  const { chatId } = useParams<{ chatId: string }>();
  const { mutate: selectTarotCard } = useSelectTarotCard();
  const ITEMS_PER_LOAD = 15;
  const [items, setItems] = useState<CardPickState[]>(
    Array.from({ length: ITEMS_PER_LOAD }, () => "Default")
  );
  const router = useRouter();
  const [isCardPicked, setIsCardPicked] = useState(false);

  if (!chatId)
    throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleClickCard = (index: number) => {
    if (isCardPicked) return;

    /** 첫번째 선택시 Card Pick animation을 위한 상태변경 */
    if (deckState === "Spread") {
      setItems((prevItems) =>
        prevItems.map((_, i) => (i === index ? "Pick" : "Down"))
      );
    }
    /** Pick된 카드 최종 선택시 타로 선택 API 호출 */
    if (items[index] === "Pick") {
      setIsCardPicked(true);
      selectTarotCard(
        {
          tarotName:
            tarotDeckData[Math.floor(Math.random() * tarotDeckData.length)].id,
          roomId: Number(chatId),
        },
        {
          onSuccess: (data) => {
            const { tarotResultId } = data;
            router.push(`/chats/${chatId}/tarot-reading/${tarotResultId}`);
          },
        }
      );
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
    <>
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
      <LoadingModal isOpen={isCardPicked} />
    </>
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
  align-items: end;
  padding-bottom: 44px;
  width: 100%;
  height: 270px;
  position: relative;
  overflow-x: scroll;
  overflow-y: visible;
  background: transparent;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  & > .no-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
