import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.js';
import { LanguageProvider } from './i18n/LanguageContext.js';
import theme from './theme.js';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);