"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const getExponentialBackoffDelay = (attemptIndex: number) => {
  return Math.min(1000 * 2 ** attemptIndex, 30000);
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // TODO: 쿼리 키 개선 이후 캐싱 전략 검토
        staleTime: 0,
      },
      mutations: {
        retry: 3,
        retryDelay: getExponentialBackoffDelay,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
