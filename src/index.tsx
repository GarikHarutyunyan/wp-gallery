import {AppInfoProvider} from 'contexts/AppInfoContext';
import React from 'react';
import ReactDOM2 from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const addApplication = (rootElement: HTMLElement) => {
  const root = ReactDOM.createRoot(rootElement);
  const galleryId: string | undefined =
    rootElement.getAttribute('data-gallery-id') || undefined;
  const showControls: boolean = !!+(
    rootElement.getAttribute('data-options-section') || 0
  );
  const baseUrl: string | undefined = (window as any).reacg_global?.rest_root;
  const nonce: string | undefined = (window as any).reacg_global?.rest_nonce;
  const pluginUrl: string | undefined = (window as any).reacg_global
    ?.plugin_url;

  root.render(
    <React.StrictMode>
      <AppInfoProvider
        galleryId={galleryId}
        showControls={showControls}
        baseUrl={baseUrl}
        nonce={nonce}
        pluginUrl={pluginUrl}
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
