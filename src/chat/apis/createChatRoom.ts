import apiClient from "@/shared/lib/axios/apiClient";
import { z } from "zod";

type serverResponse = {
  roomId: number;
};

const schema = z.object({
  roomId: z.number(),
});

export type CreateChatRoomResponse = z.infer<typeof schema>;

const validate = (data: serverResponse): CreateChatRoomResponse => {
  const validatedData = schema.parse(data);
  return validatedData;
};

export const createChatRoom = (): Promise<CreateChatRoomResponse> => {
  return apiClient
    .post<serverResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room`)
    .then((res) => validate(res.data))
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
