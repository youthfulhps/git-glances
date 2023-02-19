import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@layout/pages/Home';
import LoginCallbackPage from '@layout/pages/LoginCallback';
import styled from 'styled-components';
import tw from 'twin.macro';
import './_shared/styles/index.css';

const StyledFontWrapper = styled.div`
  ${tw`font-fira`};
`;

function Web() {
  return (
    <StyledFontWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<LoginCallbackPage />} />
        </Routes>
      </Router>
    </StyledFontWrapper>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      suspense: true,
      retry: 2,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Web />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
