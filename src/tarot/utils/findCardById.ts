import tarotDeckData from "../constants/tarotCardDeck";
import { TarotCardIdType } from "../models/tarotCardId";
const findCardById = (id: TarotCardIdType | undefined) => {
  if (id === undefined) {
    throw new Error("Tarot id is undefined");
  }
  return tarotDeckData.find((item) => item.id === id) || undefined;
};

export default findCardById;
