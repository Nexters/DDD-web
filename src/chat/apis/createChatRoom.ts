import apiClient from '@/shared/lib/axios/apiClient';
import { z } from 'zod';
import { MessageCategorySchema } from '../models/messageCategory';
import { MessageSenderTypeSchema } from '../models/messageSender';

export type CreateChatRoomResponse = {
  roomId: number;
  message: {
    messageId: number;
    type: string;
    sender: string;
    answer: string[];
  };
};

const schema = z.object({
  roomId: z.number(),
  message: z.object({
    messageId: z.number(),
    type: z.literal(MessageCategorySchema.Enum.SYSTEM_NORMAL_REPLY),
    sender: z.literal(MessageSenderTypeSchema.Enum.SYSTEM),
    answer: z.array(z.string()),
  }),
});

type CreateChatRoomData = z.infer<typeof schema>;

const validate = (data: CreateChatRoomResponse): CreateChatRoomData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const createChatRoom = () => {
  return apiClient
    .post<CreateChatRoomResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
