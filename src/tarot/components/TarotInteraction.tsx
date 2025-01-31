"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import catHand from "@/shared/assets/images/catHand.png";
import cardBack from "@/shared/assets/images/cardBack.jpg";
import styled from "styled-components";
import { easeInOut } from "motion";
import { SetStateAction, useState, Dispatch } from "react";
import { TarotCardIdType } from "@/tarot/models/tarotCardId";
import findCardById from "@/tarot/utils/findCardById";

type PropTypes = {
  setTarotInteractation: Dispatch<SetStateAction<boolean>>;
  tarotId: TarotCardIdType | undefined;
};

const putCardtransition = {
  duration: 0.6,
  ease: easeInOut,
};

const handTransition = {
  duration: 0.6,
  delay: 0.6,
  ease: easeInOut,
};

const cardRotateTransition = {
  delay: 1.2,
  duration: 0.6,
};

const TarotInteraction = ({ setTarotInteractation, tarotId }: PropTypes) => {
  const [isVisible, setIsVisible] = useState(true);

  const routingTarotResult = () => {
    setTimeout(() => {
      setTarotInteractation(false);
    }, 1000);
  };

  return (
    <TarotWaitingWrapper>
      <Center>
        <Title>
          두근두근 <br />
          어떤 카드가 나올지 기대된다냥
        </Title>
        <TarotAnimationBackground>
          <TaroAnimationWrapper
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={putCardtransition}
          >
            <CardInner
              animate={{ rotateY: 180 }}
              transition={cardRotateTransition}
              onAnimationComplete={routingTarotResult}
            >
              <CardFront alt="카드 앞면" src={findCardById(tarotId)?.imgSrc} />
              <CardBack alt="카드 뒷면" src={cardBack} />
            </CardInner>

            {isVisible && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 200 }}
                transition={handTransition}
                onAnimationComplete={() => setIsVisible(false)}
              >
                <CatHand alt="고양이손 이미지" src={catHand} />
              </motion.div>
            )}
          </TaroAnimationWrapper>
        </TarotAnimationBackground>
      </Center>
    </TarotWaitingWrapper>
  );
};

export default TarotInteraction;

const CardFront = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;

  transform: rotateY(180deg);
`;

const CardBack = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;

  backface-visibility: hidden;
`;
const CardInner = styled(motion.div)`
  position: absolute;
  background-color: transparent;
  width: 208px;
  height: 337px;
  perspective: 1000px;
  transform-style: preserve-3d;
`;
const Title = styled.h1`
  margin-bottom: 43px;
  text-align: center;
  ${({ theme }) => theme.fonts.headline2};
`;

const TarotWaitingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  overflow: hidden;
`;

const TaroAnimationWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 100vh;
`;

const CatHand = styled(Image)`
  position: relative;
  top: 296px;

  width: 158px;
  height: 278px;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TarotAnimationBackground = styled.div`
  max-width: 425px;
  width: 100%;
  height: 425px;

  border-radius: 425px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #bc95ff 0%,
    rgba(255, 255, 255, 0) 100%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
