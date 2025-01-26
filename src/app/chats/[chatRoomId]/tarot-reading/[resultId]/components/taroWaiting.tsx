"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import catHand from "@/shared/assets/images/catHand.png";
import cardBack from "@/shared/assets/images/cardBack.jpg";
import styled from "styled-components";
import { easeInOut } from "motion";

const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: easeInOut,
};

const handTransition = {
  duration: 0.8,
  delay: 1.3,
  ease: easeInOut,
};
const TaroWaiting = () => {
  return (
    <TaroWaitingWrapper>
      <Title>
        두근두근 <br />
        어떤 카드가 나올지 기대된다냥
      </Title>

      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <TaroAnimationWrapper>
          <Image alt="card" src={cardBack}></Image>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: 300 }}
            transition={handTransition}
          >
            <CardWrapper>
              <Image
                alt="cat_hand"
                src={catHand}
                width={158}
                height={278}
              ></Image>
            </CardWrapper>
          </motion.div>
        </TaroAnimationWrapper>
      </motion.div>
    </TaroWaitingWrapper>
  );
};

export default TaroWaiting;
const Title = styled.h1`
  text-align: center;
  ${({ theme }) => theme.fonts.headline2};
`;

const TaroWaitingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TaroAnimationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CardWrapper = styled.div`
  position: relative;
  bottom: 41px;
`;
