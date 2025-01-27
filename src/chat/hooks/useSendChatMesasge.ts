import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '../apis/sendChatMessage';

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: sendChatMessage,
  });
};
