import LoadingModal from "@/shared/components/LoadingModal";
import tarotDeckData from "@/tarot/constants/tarotCardDeck";
import { useSelectTarotCard } from "@/tarot/hooks/useSelectTarotCard";
import { easeInOut } from "motion";
import * as motion from "motion/react-client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { CardPickState } from "../types/CardPickState";
import { DeckState } from "../types/DeckState";
import Card from "./Card";

import { TAROT_CARD_COUNT } from "@/shared/constants/tarotCardCount";

const riseUpCardDeck = {
  duration: 0.6,
  ease: easeInOut,
};

const ChatCardSelect = () => {
  const [deckState, setDeckState] = useState<DeckState>("Stack");
  const { chatId } = useParams<{ chatId: string }>();
  const { mutate: selectTarotCard } = useSelectTarotCard();

  const [items, setItems] = useState<CardPickState[]>(
    Array.from({ length: TAROT_CARD_COUNT }, () => "Default")
  );
  const router = useRouter();
  const [isCardPicked, setIsCardPicked] = useState(false);

  if (!chatId) throw new Error("chatId가 Dynamic Route에서 전달 되어야 합니다.");

  const handleClickCard = (index: number) => {
    if (isCardPicked) return;
    /** 첫번째 선택시 Card Pick animation을 위한 상태변경 */
    if (deckState === "Spread") {
      setItems((prevItems) => prevItems.map((_, i) => (i === index ? "Pick" : "Down")));
    }
    /** Pick된 카드 최종 선택시 타로 선택 API 호출 */
    if (items[index] === "Pick") {
      setIsCardPicked(true);

      if (localStorage.getItem("카드") === "소드10번") {
        localStorage.removeItem("카드");
        selectTarotCard(
          {
            tarotName: tarotDeckData[31].id,
            roomId: Number(chatId),
          },
          {
            onSuccess: (data) => {
              const { tarotResultId } = data;
              router.push(`/chats/${chatId}/tarot-reading/${tarotResultId}`);
            },
          }
        );
        return;
      }

      if (localStorage.getItem("카드") === "죽음") {
        localStorage.removeItem("카드");
        localStorage.setItem("카드", "소드10번");
        selectTarotCard(
          {
            tarotName: tarotDeckData[13].id,
            roomId: Number(chatId),
          },
          {
            onSuccess: (data) => {
              const { tarotResultId } = data;
              router.push(`/chats/${chatId}/tarot-reading/${tarotResultId}`);
            },
          }
        );
        return;
      }
      selectTarotCard(
        {
          tarotName: tarotDeckData[Math.floor(Math.random() * tarotDeckData.length)].id,
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

  return (
    <>
      <CardDeckWrapper
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={riseUpCardDeck}
      >
        {items.map((item, idx) => (
          <Card
            key={idx}
            idx={idx}
            deckState={deckState}
            setDeckState={setDeckState}
            onClick={handleClickCard}
            cardPickState={items}
          />
        ))}
      </CardDeckWrapper>
      <LoadingModal isOpen={isCardPicked} />
    </>
  );
};

export default ChatCardSelect;

const CardDeckWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 44px;
  width: 100%;
  height: 310px;
  position: relative;
  overflow-x: scroll;
  overflow-y: visible;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  & > .no-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
