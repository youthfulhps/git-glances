import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TokenProvider } from '@shared/contexts/TokenContext';
import HomePage from '@layout/pages/Home';
import LoginCallbackPage from '@layout/pages/LoginCallback';
import './_shared/styles/index.css';

function Web() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<LoginCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
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
      <Web />
    </TokenProvider>
  </QueryClientProvider>,
);
