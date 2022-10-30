import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginCallbackPage from './pages/LoginCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="callback" element={<LoginCallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
