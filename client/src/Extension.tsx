import React from 'react';
import HomePage from '@layout/pages/Home';
import styled from 'styled-components';
import tw from 'twin.macro';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import './_shared/styles/index.css';

const StyledFontWrapper = styled.div`
  ${tw`font-fira`};
`;

function Extension() {
  return (
    <StyledFontWrapper>
      <HomePage />
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
        <Extension />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
