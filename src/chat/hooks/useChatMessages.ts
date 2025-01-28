import { useQuery } from "@tanstack/react-query";
import { getChatMessagesByRoomId } from "../apis/getChatMessagesByRoomId";

export const useChatMessages = (roomId: number) => {
  return useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: () => getChatMessagesByRoomId(roomId),
  });
};
