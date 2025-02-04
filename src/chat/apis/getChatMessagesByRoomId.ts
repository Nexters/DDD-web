import apiClient from "@/shared/lib/axios/apiClient";
import { TarotCardIdSchema } from "@/tarot/types/tarotCardId";
import { z } from "zod";
import { MessageCategorySchema } from "../types/messageCategory";
import { MessageSenderTypeSchema } from "../types/messageSender";

export type ChatMessagesByRoomIdResponse = {
  messages: {
    messageId: number;
    type: string;
    sender: string;
    answers: string[];
    tarotName?: string;
    tarotResultId?: number;
  }[];
};

const schema = z.object({
  messages: z.array(
    z.object({
      messageId: z.number(),
      type: MessageCategorySchema,
      sender: MessageSenderTypeSchema,
      answers: z.array(z.string()),
      tarotName: TarotCardIdSchema.optional(),
      tarotResultId: z.number().optional(),
    })
  ),
});

export type ChatMessagesByRoomIdData = z.infer<typeof schema>;

const validate = (data: ChatMessagesByRoomIdResponse): ChatMessagesByRoomIdData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const getChatMessagesByRoomId = (roomId: number) => {
  return apiClient
    .get<ChatMessagesByRoomIdResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room/messages`, {
      params: {
        roomId,
      },
    })
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
