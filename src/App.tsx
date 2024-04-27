import {GoogleFontsProvider} from 'contexts/GoogleFontsContext';
import {TranslationsProvider} from 'contexts/TranslationsContext';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const App: React.FC = () => {
  return (
    <TranslationsProvider>
      <SnackbarProvider>
        <GoogleFontsProvider>
          <GalleryWrapper />
        </GoogleFontsProvider>
      </SnackbarProvider>
    </TranslationsProvider>
  );
};

export default App;
