import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import AudioPage from './pages/AudioPage';
import DocumentsPage from './pages/DocumentsPage';
import KnowledgePage from './pages/KnowledgePage';
import NotFound from './pages/NotFound';
import PlayerPage from './pages/PlayerPage';
// ...existing code...
function App() {
  return (
    <Router basename={'/'}>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/player" element={<PlayerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;    