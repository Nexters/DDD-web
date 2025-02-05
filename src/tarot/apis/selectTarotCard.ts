import { MessageCategorySchema } from "@/chat/types/messageCategory";
import { MessageSenderTypeSchema } from "@/chat/types/messageSender";
import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";
import { TarotCardType } from "../types/tarotCard";
import { TarotCardIdSchema } from "../types/tarotCardId";

export type SelectTarotCardRequest = {
  roomId: number;
  tarotName: TarotCardType["id"];
};

type serverResponse = {
  messageId: number;
  type: string;
  sender: string;
  answer: string[];
  tarotName: string;
  tarotResultId: number;
};

export type SelectTarotCardResponse = z.infer<typeof schema>;

const schema = z.object({
  messageId: z.number(),
  type: z.literal(MessageCategorySchema.Enum.SYSTEM_TAROT_RESULT),
  sender: z.literal(MessageSenderTypeSchema.Enum.SYSTEM),
  answers: z.array(z.string()),
  tarotName: TarotCardIdSchema,
  tarotResultId: z.number(),
});

type SelectTarotCardData = z.infer<typeof schema>;

const validate = (data: serverResponse): SelectTarotCardData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const selectTarotCard = async (request: SelectTarotCardRequest): Promise<SelectTarotCardResponse> => {
  return apiClient
    .post<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/select`, request)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
