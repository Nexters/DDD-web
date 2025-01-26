import apiClient from '@/shared/lib/axios/apiClient';

type TarotQuestionRecommendItemResponse = {
  recommendQuestionId: number;
  question: string;
  referenceCount: number;
};

export type TarotQuestionRecommendListResponse = {
  question: TarotQuestionRecommendItemResponse[];
};

export const getTarotQuestionRecommends = () => {
  return apiClient.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/question/recommends`);
};
