import apiClient from '@/shared/lib/axios/apiClient';

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

export const getTarotReadingResultById = (resultId: number) => {
  return apiClient.get<TarotReadingResultResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/result/${resultId}`
  );
};
