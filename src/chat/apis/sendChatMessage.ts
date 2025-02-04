import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";
import { MessageCategorySchema } from "../types/messageCategory";
import { MessageSenderTypeSchema } from "../types/messageSender";

export type SendChatMessageRequest = {
  roomId: number;
  message: string;
  intent: "NORMAL" | "TAROT_ACCEPT" | "TAROT_DECLINE" | "RECOMMEND_QUESTION";
  referenceQuestionId?: number;
};

type serverResponse = {
  messageId: number;
  type: string;
  sender: string;
  answers: string[];
};

const schema = z.object({
  messageId: z.number(),
  type: z.enum([
    MessageCategorySchema.Enum.SYSTEM_NORMAL_REPLY,
    MessageCategorySchema.Enum.SYSTEM_INVALID_QUESTION_REPLY,
    MessageCategorySchema.Enum.SYSTEM_TAROT_QUESTION_REPLY,
    MessageCategorySchema.Enum.SYSTEM_TAROT_QUESTION_ACCEPTANCE_REPLY,
    MessageCategorySchema.Enum.SYSTEM_TAROT_RESULT,
  ]),
  sender: z.literal(MessageSenderTypeSchema.Enum.SYSTEM),
  answers: z.array(z.string()),
});

export type SendChatMessageResponse = z.infer<typeof schema>;

const validate = (data: serverResponse): SendChatMessageResponse => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const sendChatMessage = (request: SendChatMessageRequest): Promise<SendChatMessageResponse> => {
  return apiClient
    .post<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room/message`, request)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
