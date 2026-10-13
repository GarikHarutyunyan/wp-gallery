import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
  GoogleFontsProvider,
  TemplatesProvider,
  TranslationsProvider,
  useAppInfo,
} from 'contexts';
import {ProProvider} from 'contexts/ProContext';
import ErrorFallback from 'ErrorFallback';
import {SnackbarProvider} from 'notistack';
import React, {lazy, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import './App.css';
import {GalleryWrapper} from './components/GalleryWrapper';
import {SettingsProvider} from './components/settings/SettingsContext';

const AlertDialog = lazy(() => import('components/alert-dialog/AlertDialog'));

const typography = {
  fontSize: 14,
  htmlFontSize: 16,
  pxToRem: (size: number) => `${size}px`,
} as any;

const muiTheme = createTheme({typography});

/**
 * Dashboard (gallery edit page): overlays must clear the WP admin bar
 * (99,999) and the Media Library modal (160,000).
 */
const ADMIN_Z_INDEX_BASE = 180000;

/**
 * Standalone settings app hosted inside page builders: their chrome uses
 * very high z-index values (Beaver Builder's bar is ~1,000,000) and the host
 * panel sits at 1,000,002. Hosts also ship global rules for MUI ids/classes
 * (e.g. Elementor's `#menu- { z-index: 180000 }`), so the overrides below are
 * marked !important to win regardless of the host stylesheet.
 */
const SETTINGS_Z_INDEX_BASE = 1000100;

const buildZIndex = (base: number) => ({
  mobileStepper: base,
  fab: base + 50,
  speedDial: base + 50,
  appBar: base + 100,
  drawer: base + 200,
  modal: base + 300,
  snackbar: base + 400,
  tooltip: base + 500,
});

const buildOverlayOverrides = (zIndex: ReturnType<typeof buildZIndex>) => {
  const modal = {zIndex: `${zIndex.modal} !important`};
  const tooltip = {zIndex: `${zIndex.tooltip} !important`};
  return {
    MuiModal: {styleOverrides: {root: modal}},
    MuiDialog: {styleOverrides: {root: modal}},
    MuiPopover: {styleOverrides: {root: modal}},
    MuiMenu: {styleOverrides: {root: modal}},
    MuiPopper: {styleOverrides: {root: tooltip}},
    MuiTooltip: {styleOverrides: {popper: tooltip}},
  };
};

const adminZIndex = buildZIndex(ADMIN_Z_INDEX_BASE);
const adminTheme = createTheme({typography, zIndex: adminZIndex});

const settingsZIndex = buildZIndex(SETTINGS_Z_INDEX_BASE);
const settingsTheme = createTheme({
  typography,
  zIndex: settingsZIndex,
  components: buildOverlayOverrides(settingsZIndex),
});

const App: React.FC = () => {
  const {pluginAssetsUrl, showControls, mode} = useAppInfo();
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

  // Settings only: no gallery is rendered here. The preview gallery lives in
  // another document and is kept in sync by SettingsProvider over postMessage.
  const renderSettingsApp = () => {
    return (
      <Suspense>
        <AlertDialog />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ProProvider>
            <TranslationsProvider>
              <SnackbarProvider domRoot={document.body}>
                <GoogleFontsProvider>
                  <TemplatesProvider>
                    <SettingsProvider />
                  </TemplatesProvider>
                </GoogleFontsProvider>
              </SnackbarProvider>
            </TranslationsProvider>
          </ProProvider>
        </ErrorBoundary>
      </Suspense>
    );
  };

  if (mode === 'settings') {
    return (
      <ThemeProvider theme={settingsTheme}>{renderSettingsApp()}</ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={showControls ? adminTheme : muiTheme}>
      {showControls ? renderAppForAmdin() : renderApp()}
    </ThemeProvider>
  );
};

export default App;
