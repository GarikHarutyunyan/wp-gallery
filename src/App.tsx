import React from 'react';
import './App.css';
import Gallery from './components/Gallery';
import {SnackbarProvider} from 'notistack';
import {TranslationsProvider} from 'contexts/TranslationsContext';
import {GoogleFontsProvider} from 'contexts/GoogleFontsContext';

const App = () => {
  return (
    <TranslationsProvider>
      <SnackbarProvider>
        <GoogleFontsProvider>
          <Gallery />
        </GoogleFontsProvider>
      </SnackbarProvider>
    </TranslationsProvider>
  );
};

export default App;
