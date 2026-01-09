import HomePage from '@layout/pages/Home';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TokenProvider } from '@shared/contexts/TokenContext';
import './_shared/styles/index.css';

function Extension() {
  return <HomePage />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <TokenProvider>
      <Extension />
    </TokenProvider>
  </QueryClientProvider>,
);
