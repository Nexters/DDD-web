"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styled from "styled-components";
import CardBack from "@/shared/assets/images/cardBack.webp";
import { cubicBezier } from "motion";
import { div } from "motion/react-client";
import { SetStateAction, useState, Dispatch } from "react";
import { useRef, useEffect } from "react";
interface PropTypes {
  idx: number;
  animationTrigger: any;
}

const moveCardDeck = {
  duration: 0.5,
  delay: 1.5,
};

const Card = ({ idx, animationTrigger }: PropTypes) => {
  const [isCardShadow, setIsCardShadow] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const CardSpread = {
    x: [0, idx * 50],
    transition: {
      duration: 0.7,
      delay: 0.7,
      cubicBezier: cubicBezier(0.44, 0, 0.56, 1),
    },
  };

  const onAnimationEnd = () => {
    setIsCardShadow(true);
  };

  useEffect(() => {
    if (cardRef.current) {
      const grandParentElement = cardRef.current.parentElement?.parentElement; // 부모의 부모 요소 접근
      console.log(grandParentElement);
      const grandParentWidth = grandParentElement?.offsetWidth || 0;
      console.log(grandParentWidth);
      const cardWidth = cardRef.current.offsetWidth;

      setMoveDistance(-(grandParentWidth / 2 + cardWidth / 2)); // 부모의 부모 기준 왼쪽 끝에 붙이기
    }
  }, []);
  return (
    <CardAnimationWrapper
      ref={cardRef}
      animate={CardSpread}
      onAnimationComplete={onAnimationEnd}
    >
      <CardMoveLeft
        animate={{ translateX: moveDistance }}
        transition={moveCardDeck}
      >
        <CardWrapper
          src={CardBack}
          alt="카드 뒷면이미지"
          isCardShadow={isCardShadow}
        />
      </CardMoveLeft>
    </CardAnimationWrapper>
  );
};

export default Card;
const CardMoveLeft = styled(div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  height: 100%;
`;

const CardAnimationWrapper = styled(div)``;

const CardWrapper = styled(Image)<{ isCardShadow: boolean }>`
  border-radius: 8px;

  box-shadow: ${({ isCardShadow }) =>
    isCardShadow ? "-8px 0px 12px 0px rgba(0, 0, 0, 0.15)" : ""};

  width: 100px;
  height: 160px;
  position: absolute;

  cursor: pointer;
`;
