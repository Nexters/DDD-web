import apiClient from "../lib/axios/apiClient";

export type LogShareEventRequest = {
  resultId: number;
};

export const logShareEvent = ({ resultId }: LogShareEventRequest) => {
  return apiClient.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/common/share`,
    {
      resultId,
    },
  );
};
