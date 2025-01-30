import { StaticImageData } from "next/image";
import { TarotCardIdType } from "./tarotCardId";

export type TarotCardType = {
  name: string;
  id: TarotCardIdType;
  alt: string;
  nameKR: string;
  /**
   * TODO: 카드 이미지 경로 추가, optional 타입 제거
   * */
  imgSrc?: StaticImageData;
};
