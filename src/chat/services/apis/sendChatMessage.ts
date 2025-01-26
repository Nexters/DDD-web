import apiClient from '@/shared/lib/axios/apiClient';

type SendChatMessageRequest = {
  roomId: number;
  message: string;
  intent: IntentType;
  referenceQuestionId?: number;
};

export type SendChatMessageResponse = {
  messageId: number;
  type: MessageType;
  sender: MessageSenderType;
  answers: string[];
};

export const sendChatMessage = (request: SendChatMessageRequest) => {
  return apiClient.post<SendChatMessageResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/room/message`,
    request
  );
};

type MessageSenderType = 'SYSTEM' | 'USER';

type MessageType =
  | 'SYSTEM_NORMAL_REPLY'
  | 'SYSTEM_INVALID_QUESTION_REPLY'
  | 'SYSTEM_TAROT_QUESTION_REPLY'
  | 'SYSTEM_TAROT_QUESTION_ACCEPTANCE_REPLY'
  | 'SYSTEM_TAROT_RESULT';

type IntentType = 'NORMAL' | 'TAROT_ACCEPT' | 'TAROT_DECLINE' | 'RECOMMEND_QUESTION';
