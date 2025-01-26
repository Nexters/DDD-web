import apiClient from '../lib/axios/apiClient';

export type LogShareEventRequest = {
  resultId: number;
  target: string;
};

export const logShareEvent = ({ resultId, target }: LogShareEventRequest) => {
  return apiClient.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/common/share`, {
    resultId,
    target,
  });
};
