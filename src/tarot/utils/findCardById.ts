import tarotDeckData from "../constants/tarotCardDeck";

const findCardById = (id: string) => {
  return tarotDeckData.find((item) => item.id === id) || undefined;
};

export default findCardById;
