import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";

type serverResponse = {
  hasReviewed: boolean;
};

const schema = z.object({
  hasReviewed: z.boolean(),
});

export type TarotFollowQuestion = z.infer<typeof schema>;

const validate = (data: serverResponse): TarotFollowQuestion => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getReviewExist = (resultId: number): Promise<TarotFollowQuestion> => {
  return apiClient
    .get<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review/exist/${resultId}`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
