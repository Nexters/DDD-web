import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";

type serverResponse = {
  questions: {
    recommendQuestionId: number;
    question: string;
    referenceCount: number;
  }[];
};

const schema = z.object({
  questions: z.array(
    z.object({
      recommendQuestionId: z.number(),
      question: z.string(),
      referenceCount: z.number(),
    })
  ),
});

export type TarotQuestionRecommendListResponse = z.infer<typeof schema>;

const validate = (data: serverResponse): TarotQuestionRecommendListResponse => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotQuestionRecommends = (): Promise<TarotQuestionRecommendListResponse> => {
  return apiClient
    .get<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/question/recommends`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
