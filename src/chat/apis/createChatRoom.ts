import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";

export type CreateChatRoomResponse = {
  roomId: number;
};

const schema = z.object({
  roomId: z.number(),
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
