import {GoogleFontsProvider} from 'contexts/GoogleFontsContext';
import {TranslationsProvider} from 'contexts/TranslationsContext';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

const App: React.FC = () => {
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
