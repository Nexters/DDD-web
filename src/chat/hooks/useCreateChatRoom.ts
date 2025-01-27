import { useMutation } from '@tanstack/react-query';

import { createChatRoom } from '../apis/createChatRoom';

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: createChatRoom,
  });
};
