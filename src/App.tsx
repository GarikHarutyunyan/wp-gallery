import {GoogleFontsProvider, TranslationsProvider} from 'contexts';
import ErrorFallback from 'ErrorFallback';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TranslationsProvider>
        <SnackbarProvider domRoot={document.body}>
          <GoogleFontsProvider>
            <GalleryWrapper />
          </GoogleFontsProvider>
        </SnackbarProvider>
      </TranslationsProvider>
    </ErrorBoundary>
  );
};

export default App;
