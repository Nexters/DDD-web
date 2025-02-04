import { StaticImageData } from "next/image";
import { TarotCardIdType } from "./tarotCardId";

export type TarotCardType = {
  name: string;
  id: TarotCardIdType;
  alt: string;
  nameKR: string;
  imgSrc: StaticImageData;
};
