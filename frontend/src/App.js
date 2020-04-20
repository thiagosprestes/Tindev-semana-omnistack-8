import React, { useState } from 'react';
import GlobalStyle from './styles/globalStyles.js';

import { ThemeProvider } from 'styled-components'; 

import dark from './styles/themes/dark';
import light from './styles/themes/light';

import usePersistedState from './utils/usePersistedState';

import Routes from './routes';

function App() {
  const [ theme, setTheme ] = usePersistedState('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title == 'light' ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes theme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
