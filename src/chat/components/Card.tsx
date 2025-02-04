"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import CardBack from "@/shared/assets/images/cardBack.webp";
import { cubicBezier, easeOut } from "motion";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import { CardPickState } from "../models/CardPickState";
import { DeckState } from "../models/DeckState";
import * as Tooltip from "@radix-ui/react-tooltip";

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

    if (cardPickState[idx] === "Pick") {
    }
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
    <Tooltip.Provider>
      <Tooltip.Root open={cardPickState[idx] === "Pick"}>
        <CardAnimationWrapper
          ref={cardRef}
          variants={cardVariants}
          animate={getCardAnimation()}
          onClick={handleClickCard}
          onAnimationComplete={onAnimationEnd}
        >
          <Tooltip.Trigger asChild>
            <CardWrapper src={CardBack} alt="카드 뒷면 이미지" isCardShadow={isCardShadow} />
          </Tooltip.Trigger>

          {/* <motion.div
            initial={{ opacity: 0 }} // 시작 상태: 불투명도 0, 아래로 20px
            animate={{ opacity: 1 }} // 애니메이션 완료 상태: 불투명도 1, 위치 0px
            transition={{
              duration: 10.5, // 애니메이션 지속 시간 1초
              delay: 10, // 애니메이션 시작 전 0.5초 지연
            }}
            css={css`
              cursor: pointer;
              transform: rotate(-16deg);

              & > [data-radix-popper-content-wrapper] {
                transform: translate(-43px, -213.5px) !important;
              }
            `}
          > */}
          <Tooltip.Content
            css={css`
              background-color: ${({ theme }) => theme.colors.grey90};
              color: ${({ theme }) => theme.colors.white};
              padding: 6px 8px;
              border-radius: 8px;
              ${({ theme }) => theme.fonts.body1}
              text-align: center;
              cursor: pointer;
              transform: rotate(-16deg);
              border: 1px solid #24292f;
              & > span {
                left: 107.5px !important;
              }
            `}
          >
            <Tooltip.Arrow
              width={16}
              height={10}
              css={css`
                fill: ${({ theme }) => theme.colors.grey90};
              `}
            />
            이 카드를 뽑으려면 한 번 더 터치해줘냥
          </Tooltip.Content>
          {/* </motion.div> */}
        </CardAnimationWrapper>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Card;

const CardAnimationWrapper = styled(motion.div)`
  width: 100px;
  height: 160px;
  position: absolute;

  cursor: pointer;

  & > [data-radix-popper-content-wrapper] {
    transform: translate(-89.5px, -54px) !important;

    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.5s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CardWrapper = styled(Image)<{ isCardShadow: boolean }>`
  border-radius: 8px;

  box-shadow: ${({ isCardShadow }) =>
    isCardShadow ? "-8px 0px 12px 0px rgba(0, 0, 0, 0.15)" : ""};

  width: 100px;
  height: 160px;
`;
