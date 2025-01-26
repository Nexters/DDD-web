import apiClient from '@/shared/lib/axios/apiClient';
import { z } from 'zod';

type SendChatMessageRequest = {
  roomId: number;
  message: string;
  intent: 'NORMAL' | 'TAROT_ACCEPT' | 'TAROT_DECLINE' | 'RECOMMEND_QUESTION';
  referenceQuestionId?: number;
};

export type SendChatMessageResponse = {
  messageId: number;
  type: string;
  sender: string;
  answers: string[];
};

const schema = z.object({
  messageId: z.number(),
  type: z.enum([
    'SYSTEM_NORMAL_REPLY',
    'SYSTEM_INVALID_QUESTION_REPLY',
    'SYSTEM_TAROT_QUESTION_REPLY',
    'SYSTEM_TAROT_QUESTION_ACCEPTANCE_REPLY',
    'SYSTEM_TAROT_RESULT',
  ]),
  sender: z.literal('SYSTEM'),
  answers: z.array(z.string()),
});

type SendChatMessageData = z.infer<typeof schema>;

const validate = (data: SendChatMessageResponse): SendChatMessageData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const sendChatMessage = (request: SendChatMessageRequest) => {
  return apiClient
    .post<SendChatMessageResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room/message`, request)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
