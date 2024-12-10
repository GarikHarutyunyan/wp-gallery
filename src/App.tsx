import {GoogleFontsProvider, TranslationsProvider} from 'contexts';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const App: React.FC = () => {
  return (
    <TranslationsProvider>
      <SnackbarProvider domRoot={document.body}>
        <GoogleFontsProvider>
          <GalleryWrapper />
        </GoogleFontsProvider>
      </SnackbarProvider>
    </TranslationsProvider>
  );
};

export default App;
