import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext.js';
import theme from './theme.js';
import './styles.css';

// Import pages
import LandingPage from './pages/LandingPage/index.js';
import UserDashboard from './pages/UserDashboard/index.js';
import AdminDashboard from './pages/AdminDashboard/index.js';

function App() {
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;