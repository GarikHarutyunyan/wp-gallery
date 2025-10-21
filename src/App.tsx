import {GoogleFontsProvider, TranslationsProvider, useAppInfo} from 'contexts';
import {ProProvider} from 'contexts/ProContext';
import ErrorFallback from 'ErrorFallback';
import {SnackbarProvider} from 'notistack';
import React, {lazy, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const AlertDialog = lazy(() => import('components/alert-dialog/AlertDialog'));

const App: React.FC = () => {
  const {showControls} = useAppInfo();

  const renderApp = () => {
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

  const renderAppForAmdin = () => {
    return (
      <Suspense>
        <AlertDialog />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ProProvider>{renderApp()}</ProProvider>
        </ErrorBoundary>
      </Suspense>
    );
  };

  return showControls ? renderAppForAmdin() : renderApp();
};

export default App;
