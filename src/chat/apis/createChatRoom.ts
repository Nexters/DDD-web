import apiClient from '@/shared/lib/axios/apiClient';

type MessageSenderType = 'SYSTEM';

type MessageType = 'SYSTEM_NORMAL';

export type CreateChatRoomResponse = {
  roomId: number;
  message: {
    messageId: number;
    type: MessageType;
    sender: MessageSenderType;
    answer: string[];
  };
};

export const createChatRoom = () => {
  return apiClient.post<CreateChatRoomResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room`);
};
