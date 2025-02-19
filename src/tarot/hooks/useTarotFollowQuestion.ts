import { useQuery } from "@tanstack/react-query";
import { getTarotFollowQuestion } from "../apis/getTarotFollowQuestion";

export const useTarotFollowQuestion = (chatId: number) => {
  return useQuery({
    queryKey: ["getTarotFollowQuestion"],
    queryFn: () => getTarotFollowQuestion(chatId),
  });
};
