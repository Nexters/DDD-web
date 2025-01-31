import tarotDeckData from "../constants/tarotCardDeck";
import { TarotCardIdType } from "@/tarot/models/tarotCardId";

const findCardById = (id: TarotCardIdType | undefined) => {
  if (id !== undefined) {
    return tarotDeckData.find((item) => item.id === id);
  }
};

export default findCardById;
