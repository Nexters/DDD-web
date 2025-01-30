import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "../apis/sendChatMessage";

export const useSendChatMessage = () => {
  // TODO: mutate의 OnSuccess 로직을 useMutation의 onSuccess로 이동하기
  return useMutation({
    mutationFn: sendChatMessage,
  });
};
