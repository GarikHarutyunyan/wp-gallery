import {AppInfoProvider} from 'contexts/AppInfoContext';
import React from 'react';
import ReactDOM2 from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootMap: Map<HTMLElement, ReactDOM.Root> = new Map();

const addApplication = (rootElement: HTMLElement) => {
  const isElementEmpty = !rootElement.hasChildNodes();

  if (!isElementEmpty) {
    // If the element is not empty, unmount any existing React root
    rootMap.get(rootElement)?.unmount();
  }

  const root = ReactDOM.createRoot(rootElement);
  // Store the root instance to manage unmounting later if needed
  rootMap.set(rootElement, root);

  // Extract gallery-specific settings from root element data attributes
  // Enables multiple galleries with different settings on the same page
  const galleryId: string | undefined =
    rootElement.getAttribute('data-gallery-id') || undefined;
  const galleryInstanceId: string | undefined =
    rootElement.getAttribute('id') || undefined;
  const showControls: boolean = !!+(
    rootElement.getAttribute('data-options-section') || 0
  );
  const pluginVersion: string =
    rootElement.getAttribute('data-plugin-version') || '';
  const getGalleryTimestamp = () =>
    rootElement.getAttribute('data-gallery-timestamp') || '';
  const getOptionsTimestamp = () =>
    rootElement.getAttribute('data-options-timestamp') || '';
  const optionsContainerSelector =
    rootElement.getAttribute('data-options-container') || '';

  // All non-gallery-specific settings are passed via global variables
  // to avoid repetition and large inline scripts on each gallery container.
  const reacgGlobal = (window as any).reacg_global;
  const reacg = (window as any).reacg;

  const baseUrl: string | undefined = reacgGlobal?.rest_root;
  const nonce: string | undefined = reacg?.rest_nonce;
  const pluginUrl: string | undefined = reacgGlobal?.plugin_url;
  const pluginAssetsUrl: string | undefined = reacgGlobal?.plugin_assets_url;

  root.render(
    <React.StrictMode>
      <AppInfoProvider
        galleryInstanceId={galleryInstanceId}
        galleryId={galleryId}
        showControls={showControls}
        baseUrl={baseUrl}
        nonce={nonce}
        pluginUrl={pluginUrl}
        pluginAssetsUrl={pluginAssetsUrl}
        pluginVersion={pluginVersion}
        getGalleryTimestamp={getGalleryTimestamp}
        getOptionsTimestamp={getOptionsTimestamp}
        optionsContainerSelector={optionsContainerSelector}
      >
        <App />
      </AppInfoProvider>
    </React.StrictMode>
  );
};

const addApplicationById = () => {
  const id: string | undefined =
    document.getElementById('reacg-loadApp')?.getAttribute('data-id') ||
    undefined;
  const rootElement: HTMLElement | null = id
    ? document.getElementById(id)
    : null;

  rootElement && addApplication(rootElement);
};

let isBootsrapped: boolean = false;

const bootstrap = () => {
  if (!isBootsrapped) {
    const galleryContainers: any[] = Array.from(
      document.getElementsByClassName('reacg-gallery') as any
    );

    if (galleryContainers?.length) {
      galleryContainers?.forEach((galleryContainer: any) => {
        addApplication(galleryContainer);
      });
      ReactDOM2.createPortal(
        <button id={'reacg-loadApp'} onClick={addApplicationById}></button>,
        document.querySelector('body') as Element
      );

      const div = document.createElement('div');
      div.setAttribute('id', 'reacg-loadAppContainer');
      const body = document.querySelector('body') as any;
      body.append(div);
      const rootElement = ReactDOM.createRoot(div);
      rootElement.render(
        <input
          type={'button'}
          id={'reacg-loadApp'}
          onClick={addApplicationById}
        ></input>
      );
      isBootsrapped = true;
    }
  }
};

document.addEventListener('DOMContentLoaded', bootstrap);

let recheckCount: number = 0;

const recheck = () => {
  recheckCount++;
  bootstrap();
  if (recheckCount > 20 || isBootsrapped) {
    clearInterval(recheckAfterInterval);
  }
};

// recheck per second to avoid cases when DOMContentLoaded is not triggered because of some load issues
const recheckAfterInterval = setInterval(recheck, 1000);
