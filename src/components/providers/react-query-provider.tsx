"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true
    }
  }
});

function ReactQueryProvider({ children }: React.PropsWithChildren) {

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider