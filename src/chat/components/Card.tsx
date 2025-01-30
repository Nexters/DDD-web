import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styled from "styled-components";
import CardBack from "@/shared/assets/images/cardBack.webp";
interface PropTypes {
  imgSrc: string;
}

const Card = () => {
  return <CardWrapper src={CardBack} alt="카드 뒷면이미지" />;
};

export default Card;

const CardWrapper = styled(Image)`
  border-radius: 8px;
  /* border: 1px solid ${({ theme }) => theme.colors.grey40};
   */
  box-shadow: -8px 0px 12px 0px rgba(0, 0, 0, 0.15);
  width: 100px;
  height: 160px;
  position: absolute;
`;
