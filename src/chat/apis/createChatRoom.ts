import apiClient from '@/shared/lib/axios/apiClient';
import { z } from 'zod';

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
    type: z.literal('SYSTEM_NORMAL'),
    sender: z.literal('SYSTEM'),
    answer: z.array(z.string()),
  }),
});

type CreateChatRoomData = z.infer<typeof schema>;

const adapt = (data: CreateChatRoomResponse): CreateChatRoomData => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const createChatRoom = () => {
  return apiClient
    .post<CreateChatRoomResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room`)
    .then((res) => adapt(res.data))
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};
