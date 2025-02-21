import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";

type serverResponse = {
  questions: string[];
};

const schema = z.object({
  questions: z.string().array(),
});

export type TarotFollowQuestion = z.infer<typeof schema>;

const validate = (data: serverResponse): TarotFollowQuestion => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotFollowQuestion = (
  chatRoomId: number,
  resultId: number
): Promise<TarotFollowQuestion> => {
  return apiClient
    .get<serverResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/question/follow?chatRoomId=${chatRoomId}&tarotResultId=${resultId}`
    )
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
