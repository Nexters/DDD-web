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

type TarotCardType =
  | 'M_00'
  | 'M_01'
  | 'M_02'
  | 'M_03'
  | 'M_04'
  | 'M_05'
  | 'M_06'
  | 'M_07'
  | 'M_08'
  | 'M_09'
  | 'M_10'
  | 'M_11'
  | 'M_12'
  | 'M_13'
  | 'M_14'
  | 'M_15'
  | 'M_16'
  | 'M_17'
  | 'M_18'
  | 'M_19'
  | 'M_20'
  | 'M_21'
  | 'S_01'
  | 'S_02'
  | 'S_03'
  | 'S_04'
  | 'S_05'
  | 'S_06'
  | 'S_07'
  | 'S_08'
  | 'S_09'
  | 'S_10'
  | 'S_K'
  | 'S_Q'
  | 'S_N'
  | 'S_P'
  | 'C_01'
  | 'C_02'
  | 'C_03'
  | 'C_04'
  | 'C_05'
  | 'C_06'
  | 'C_07'
  | 'C_08'
  | 'C_09'
  | 'C_10'
  | 'C_K'
  | 'C_Q'
  | 'C_N'
  | 'C_P'
  | 'P_01'
  | 'P_02'
  | 'P_03'
  | 'P_04'
  | 'P_05'
  | 'P_06'
  | 'P_07'
  | 'P_08'
  | 'P_09'
  | 'P_10'
  | 'P_K'
  | 'P_Q'
  | 'P_N'
  | 'P_P';

export type SelectTarotCardRequest = {
  roomId: number;
  tarotName: TarotCardType;
};

export type SelectTarotCardResponse = {
  messageId: number;
  type: MessageType;
  sender: MessageSenderType;
  answer: string[];
  tarotName: TarotCardType;
  tarotResultId: number;
};

export const selectTarotCard = (request: SelectTarotCardRequest) => {
  return apiClient.post<SelectTarotCardResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/tarot/select`,
    request
  );
};
