"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styled from "styled-components";
import CardBack from "@/shared/assets/images/cardBack.webp";
import { cubicBezier } from "motion";
import { div } from "motion/react-client";
import { useState } from "react";
interface PropTypes {
  idx: number;
}

const Card = ({ idx }: PropTypes) => {
  const [isCardShadow, setIsCardShadow] = useState(false);

  const CardSpread = {
    x: [0, idx * 50],
    transition: {
      duration: 0.7,
      delay: 0.7,
      cubicBezier: cubicBezier(0.44, 0, 0.56, 1),
    },
  };

  return (
    <CardAnimationWrapper
      zIndex={idx}
      animate={CardSpread}
      onAnimationComplete={() => setIsCardShadow(true)}
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

const CardAnimationWrapper = styled(div)<{ zIndex: number }>`
  z-index: ${({ zIndex }) => zIndex + 1};
`;

const CardWrapper = styled(Image)<{ isCardShadow: boolean }>`
  border-radius: 8px;

  box-shadow: ${({ isCardShadow }) =>
    isCardShadow ? "-8px 0px 12px 0px rgba(0, 0, 0, 0.15)" : ""};

  width: 100px;
  height: 160px;
  position: absolute;
`;
