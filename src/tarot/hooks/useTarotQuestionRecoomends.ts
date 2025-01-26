import { useQuery } from '@tanstack/react-query';
import { getTarotQuestionRecommends } from '../apis/getTarotQuestionRecommends';

export const useTarotQuestionRecommends = () => {
  return useQuery({
    queryKey: ['tarotQuestionRecommends'],
    queryFn: getTarotQuestionRecommends,
  });
};
