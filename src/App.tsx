import React from 'react';
import './App.css';
import Gallery from './components/Gallery';
import {SnackbarProvider} from 'notistack';
import {AppTranslationsProvider} from 'AppTranslationsContext';

function App() {
  return (
    <AppTranslationsProvider>
      <SnackbarProvider>
        <Gallery />
      </SnackbarProvider>
    </AppTranslationsProvider>
  );
}

export default App;
