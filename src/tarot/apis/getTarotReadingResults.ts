import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";
import { TarotCardIdSchema } from "../types/tarotCardId";

type ServerResponse = {
  results: {
    chatRoomId: number;
    createdAt: string;
    id: number;
    questionSummary: string;
    selectedTarot: string;
    tarotResultId: number;
  };
};

const schema = z.object({
  results: z.array(
    z.object({
      chatRoomId: z.number(),
      createdAt: z.string(),
      id: z.number(),
      questionSummary: z.string(),
      selectedTarot: TarotCardIdSchema,
      tarotResultId: z.number(),
    })
  ),
});

export type TarotReadingResultsResponse = z.infer<typeof schema>;

const validate = (data: ServerResponse): TarotReadingResultsResponse => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getTarotReadingResults = async (): Promise<TarotReadingResultsResponse> => {
  return apiClient
    .get<ServerResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/history`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
