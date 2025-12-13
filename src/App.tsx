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
  const {pluginAssetsUrl, showControls} = useAppInfo();
  // Override the __webpack_public_path__ at runtime to use the plugin_url from global variable
  // This ensures that all dynamically loaded chunks use the correct base URL
  // This is particularly useful in WordPress environments where the plugin URL may vary
  // More Info: https://webpack.js.org/guides/public-path/#on-the-fly
  if (pluginAssetsUrl) {
    // @ts-ignore
    __webpack_public_path__ = pluginAssetsUrl;
  }

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
