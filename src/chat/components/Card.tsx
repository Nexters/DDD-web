"use client";

import CardBack from "@/shared/assets/images/cardBack.webp";
import { cubicBezier, easeOut } from "motion";
import { div } from "motion/react-client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CardPickState } from "../types/CardPickState";
import { DeckState } from "../types/DeckState";
interface PropTypes {
  idx: number;
  deckState: DeckState;
  setDeckState: Dispatch<SetStateAction<DeckState>>;
  onClick: (index: number) => void;
  cardPickState: CardPickState[];
}

const Card = ({ idx, deckState, setDeckState, onClick, cardPickState }: PropTypes) => {
  const [isCardShadow, setIsCardShadow] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    initial: { x: 0, y: 0, rotate: 0 },
    spread: {
      x: [0, idx * 50, idx * 50 + moveDistance],
      transition: {
        duration: 1.2,
        delay: 0.7,
        time: [0, 0.7, 1.2],
        ease: [cubicBezier(0.44, 0, 0.56, 1), "easeInOut"],
      },
    },

    infiniteScroll: {
      x: [0, idx * 50, idx * 50 + moveDistance],
      transition: {
        duration: 0.01,
        ease: easeOut,
      },
    },

    clickAnimation: {
      y: -50,
      rotate: 16,
      transition: {
        duration: 0.3,
      },
    },

    cardDownAnimation: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const onAnimationEnd = () => {
    setIsCardShadow(true);
    setDeckState("Spread");
  };

  const handleClickCard = () => {
    onClick(idx);
  };

  const getCardAnimation = () => {
    if (deckState === "Stack") return "spread";
    if (deckState === "Spread") {
      if (cardPickState[idx] === "Pick") return "clickAnimation";
      if (cardPickState[idx] === "Down") return "cardDownAnimation";
    }
    return "infiniteScroll";
  };

  useEffect(() => {
    if (cardRef.current) {
      const cardPos = cardRef.current.offsetLeft;
      setMoveDistance(-cardPos); // 부모 기준 왼쪽으로 붙이기
    }
  }, []);

  return (
    <CardAnimationWrapper
      ref={cardRef}
      variants={cardVariants}
      animate={getCardAnimation()}
      onClick={handleClickCard}
      onAnimationComplete={onAnimationEnd}
    >
      <CardWrapper src={CardBack} alt="카드 뒷면 이미지" isCardShadow={isCardShadow} />
    </CardAnimationWrapper>
  );
};

export default Card;

const CardAnimationWrapper = styled(div)`
  width: 100px;
  height: 160px;
  position: absolute;

  cursor: pointer;
`;

const CardWrapper = styled(Image)<{ isCardShadow: boolean }>`
  border-radius: 8px;

  box-shadow: ${({ isCardShadow }) => (isCardShadow ? "-8px 0px 12px 0px rgba(0, 0, 0, 0.15)" : "")};

  width: 100px;
  height: 160px;
`;
