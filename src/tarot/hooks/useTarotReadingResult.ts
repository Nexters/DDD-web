import { useQuery } from "@tanstack/react-query";
import { getTarotReadingResultById } from "../apis/getTarotReadingResultById";

export const useTarotReadingResult = (resultId: number) => {
  return useQuery({
    queryKey: ["tarotReadingResult", resultId],
    queryFn: () => getTarotReadingResultById(resultId),
  });
};
