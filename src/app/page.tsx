import ChatOverviewA from "@/chat/components/ChatOverviewA";
import { getTarotQuestionRecommends } from "@/tarot/apis/getTarotQuestionRecommends";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tarotQuestionRecommends"],
    queryFn: getTarotQuestionRecommends,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatOverviewA />
    </HydrationBoundary>
  );
}
