import tarotDeckData from "../constants/tarotCardDeck";
import { TarotCardIdType } from "../models/tarotCardId";

const findCardById = (id: TarotCardIdType) => {
  const found = tarotDeckData.find((item) => item.id === id);

  if (!found) {
    throw new Error("존재하지 않는 카드입니다.");
  }

  return found;
};

export default findCardById;
