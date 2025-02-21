import { useQuery } from "@tanstack/react-query";
import { getReviewExist } from "../apis/getReviewExist";

export const useTarotReviewExist = (requestId: number, isOwner: boolean | undefined) => {
  return useQuery({
    queryKey: ["tarotReviewExist"],
    queryFn: () => getReviewExist(requestId),
    enabled: !!isOwner,
  });
};
