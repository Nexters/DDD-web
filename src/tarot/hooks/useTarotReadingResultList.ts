import { useQuery } from "@tanstack/react-query";
import { getTarotReadingResults } from "../apis/getTarotReadingResults";

export const useTarotReadingResultList = () => {
  return useQuery({
    queryKey: ["tarotReadingResultList"],
    queryFn: getTarotReadingResults,
  });
};
