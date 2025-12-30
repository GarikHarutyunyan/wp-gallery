import {GoogleFontsProvider, TranslationsProvider, useAppInfo} from 'contexts';
import {ProProvider} from 'contexts/ProContext';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';

const App: React.FC = () => {
  const {pluginAssetsUrl} = useAppInfo();
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
            <ProProvider>
              <GalleryWrapper />
            </ProProvider>
          </GoogleFontsProvider>
        </SnackbarProvider>
      </TranslationsProvider>
    );
  };

  return renderApp();
};

export default App;
