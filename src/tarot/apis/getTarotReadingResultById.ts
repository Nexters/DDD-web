import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";
import { TarotCardIdSchema } from "../types/tarotCardId";

type serverResponse = {
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
  isOwner: z.boolean(),
  summary: z.string(),
});

export type TarotReadingResultResponse = z.infer<typeof schema>;

const validate = (data: serverResponse): TarotReadingResultResponse => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotReadingResultById = async (
  resultId: number
): Promise<TarotReadingResultResponse> => {
  return apiClient
    .get<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/result/${resultId}`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
