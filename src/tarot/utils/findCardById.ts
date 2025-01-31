import tarotDeckData from "../constants/tarotCardDeck";
import { TarotCardIdType } from "@/tarot/models/tarotCardId";

const findCardById = (id: TarotCardIdType | undefined) => {
  if (!id) return null;

  const card = tarotDeckData.find((item) => item.id === id);
  return card ?? null;
};

export default findCardById;
