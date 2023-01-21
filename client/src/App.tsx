import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@layout/pages/Home';
import LoginCallbackPage from '@layout/pages/LoginCallback';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledFontWrapper = styled.div`
  ${tw`font-fira`};
`;

function App() {
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

export default App;
