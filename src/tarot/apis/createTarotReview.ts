import apiClient from "@/shared/lib/axios/apiClient";

enum ReviewScore {
  BAD = "0",
  NOT_BAD = "1",
  GOOD = "2",
}
export const createTarotReview = async (grade: ReviewScore, resultId: number) => {
  return apiClient
    .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review/create`, {
      grade: grade,
      tarotResultId: resultId,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
