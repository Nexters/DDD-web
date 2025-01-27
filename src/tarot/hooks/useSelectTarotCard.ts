import { useMutation } from '@tanstack/react-query';
import { selectTarotCard } from '../apis/selectTarotCard';

export const useSelectTarotCard = () => {
  return useMutation({
    mutationFn: selectTarotCard,
  });
};
