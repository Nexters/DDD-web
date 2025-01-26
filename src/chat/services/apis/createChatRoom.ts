import apiClient from '@/shared/lib/axios/apiClient';

type MessageSenderType = 'SYSTEM' | 'USER';

type MessageType =
  | 'USER_NORMAL'
  | 'USER_INVALID_QUESTION'
  | 'USER_TAROT_QUESTION'
  | 'USER_TAROT_QUESTION_ACCEPTANCE'
  | 'USER_TAROT_QUESTION_DECLINE'
  | 'USER_FOLLOW_QUESTION'
  | 'SYSTEM_HELLO'
  | 'SYSTEM_NORMAL_REPLY'
  | 'SYSTEM_INVALID_QUESTION_REPLY'
  | 'SYSTEM_TAROT_QUESTION_REPLY'
  | 'SYSTEM_TAROT_QUESTION_ACCEPTANCE_REPLY'
  | 'SYSTEM_TAROT_RESULT';

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
