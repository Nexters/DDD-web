import apiClient from '@/shared/lib/axios/apiClient';
import { z } from 'zod';

export type TarotQuestionRecommendListResponse = {
  question: {
    recommendQuestionId: number;
    question: string;
    referenceCount: number;
  }[];
};

const schema = z.object({
  question: z.array(
    z.object({
      recommendQuestionId: z.number(),
      question: z.string(),
      referenceCount: z.number(),
    })
  ),
});

type TarotQuestionRecommendListData = z.infer<typeof schema>;

const adapt = (data: TarotQuestionRecommendListResponse): TarotQuestionRecommendListData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotQuestionRecommends = async () => {
  return apiClient
    .get<TarotQuestionRecommendListResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/question/recommends`)
    .then((res) => adapt(res.data))
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
