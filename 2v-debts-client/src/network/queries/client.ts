import { QueryClient } from '@tanstack/react-query';

// tanstack query client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
