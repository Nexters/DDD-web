import apiClient from '@/shared/lib/axios/apiClient';
import { z } from 'zod';
import { TarotCardIdSchema } from '../models/tarotCardId';

export type TarotReadingResultResponse = {
  tarot: string;
  type: string;
  cardValue: {
    summary: string;
    description: string;
  };
  answer: {
    summary: string;
    description: string;
    question: string;
  };
  advice: {
    summary: string;
    description: string;
  };
};

const schema = z.object({
  tarot: TarotCardIdSchema,
  type: z.string(),
  cardValue: z.object({
    summary: z.string(),
    description: z.string(),
  }),
  answer: z.object({
    summary: z.string(),
    description: z.string(),
    question: z.string(),
  }),
  advice: z.object({
    summary: z.string(),
    description: z.string(),
  }),
});

type TarotReadingResultData = z.infer<typeof schema>;

const validate = (data: TarotReadingResultResponse): TarotReadingResultData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotReadingResultById = async (resultId: number) => {
  return apiClient
    .get<TarotReadingResultResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/result/${resultId}`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
