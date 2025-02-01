import { MessageCategorySchema } from "@/chat/models/messageCategory";
import { MessageSenderTypeSchema } from "@/chat/models/messageSender";
import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";
import { TarotCardType } from "../models/tarotCard";
import { TarotCardIdSchema } from "../models/tarotCardId";

export type SelectTarotCardRequest = {
  roomId: number;
  tarotName: TarotCardType["id"];
};

export type SelectTarotCardResponse = {
  messageId: number;
  type: string;
  sender: string;
  answer: string[];
  tarotName: string;
  tarotResultId: number;
};

const schema = z.object({
  messageId: z.number(),
  type: z.literal(MessageCategorySchema.Enum.SYSTEM_TAROT_RESULT),
  sender: z.literal(MessageSenderTypeSchema.Enum.SYSTEM),
  answers: z.array(z.string()),
  tarotName: TarotCardIdSchema,
  tarotResultId: z.number(),
});

type SelectTarotCardData = z.infer<typeof schema>;

const validate = (data: SelectTarotCardResponse): SelectTarotCardData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const selectTarotCard = async (request: SelectTarotCardRequest) => {
  return apiClient
    .post<SelectTarotCardResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/select`, request)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
