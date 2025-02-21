import { useQuery } from "@tanstack/react-query";
import { getReviewExist } from "../apis/getReviewExist";

export const useTarotReviewExist = (requestId: number) => {
  return useQuery({
    queryKey: ["tarotReviewExist"],
    queryFn: () => getReviewExist(requestId),
  });
};
