import React from 'react';
import HomePage from '@layout/pages/Home';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Extension />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
