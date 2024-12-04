import {
  GoogleFontsProvider,
  TranslationsProvider,
  ValidationProvider,
} from 'contexts';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const App: React.FC = () => {
  return (
    <ValidationProvider>
      <TranslationsProvider>
        <SnackbarProvider domRoot={document.body}>
          <GoogleFontsProvider>
            <GalleryWrapper />
          </GoogleFontsProvider>
        </SnackbarProvider>
      </TranslationsProvider>
    </ValidationProvider>
  );
};

export default App;
