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
      <ProProvider>
        <TranslationsProvider>
          <SnackbarProvider domRoot={document.body}>
            <GoogleFontsProvider>
              <GalleryWrapper />
            </GoogleFontsProvider>
          </SnackbarProvider>
        </TranslationsProvider>
      </ProProvider>
    );
  };

  const renderAppWithAlert = () => {
    return (
      <Suspense>
        <AlertDialog />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {renderApp()}
        </ErrorBoundary>
      </Suspense>
    );
  };

  return showControls ? renderAppWithAlert() : renderApp();
};

export default App;
