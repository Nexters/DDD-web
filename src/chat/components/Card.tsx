"use client";

import Image from "next/image";
import styled from "styled-components";
import CardBack from "@/shared/assets/images/cardBack.webp";
import { cubicBezier, easeOut } from "motion";
import { div } from "motion/react-client";
import { useState } from "react";
import { Dispatch, SetStateAction, useRef, useEffect } from "react";

interface PropTypes {
  idx: number;
  cardDeckAnimation: boolean;
  setCardDeckAnimation: Dispatch<SetStateAction<boolean>>;
}

const moveCardDeck = {
  duration: 0.5,
  delay: 1.5,
};

const Card = ({ idx, cardDeckAnimation, setCardDeckAnimation }: PropTypes) => {
  const [isCardShadow, setIsCardShadow] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    initial: { x: 0 },
    spread: {
      x: [0, idx * 50, idx * 50 + moveDistance],
      transition: {
        duration: 1.2,
        delay: 0.7,
        time: [0, 0.7, 1.2],
        ease: [cubicBezier(0.44, 0, 0.56, 1), "easeInOut"],
      },
    },

    temp: {
      x: [0, idx * 50, idx * 50 + moveDistance],
      transition: {
        duration: 0.01,
        ease: easeOut,
      },
    },
  };

  const onAnimationEnd = () => {
    setIsCardShadow(true);
    setCardDeckAnimation(false);
  };

  useEffect(() => {
    if (cardRef.current) {
      const cardPos = cardRef.current.offsetLeft;
      setMoveDistance(-cardPos); // 부모 기준 왼쪽으로 붙이기
    }
  }, []);

  console.log(moveDistance);

  return (
    <CardAnimationWrapper
      ref={cardRef}
      variants={cardVariants}
      animate={cardDeckAnimation ? "spread" : "temp"}
      onAnimationComplete={onAnimationEnd}
    >
      <CardWrapper
        src={CardBack}
        alt="카드 뒷면이미지"
        isCardShadow={isCardShadow}
      />
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

  box-shadow: ${({ isCardShadow }) =>
    isCardShadow ? "-8px 0px 12px 0px rgba(0, 0, 0, 0.15)" : ""};

  width: 100px;
  height: 160px;
`;
