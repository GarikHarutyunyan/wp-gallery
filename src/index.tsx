import {AppInfoProvider} from 'contexts/AppInfoContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'utils/srcSetChecker';
import App from './App';

const rootMap: Map<HTMLElement, ReactDOM.Root> = new Map();

const getGlobal = (key: string): string | undefined =>
  (window as any).reacg_global?.[key];

const unmountRoot = (rootElement: HTMLElement) => {
  const existing = rootMap.get(rootElement);
  if (existing) {
    existing.unmount();
    rootMap.delete(rootElement);
  }
};

/**
 * Mount a gallery (and, on the dashboard, its portaled controls).
 */
const addApplication = (rootElement: HTMLElement) => {
  const isElementEmpty = !rootElement.hasChildNodes();

  if (!isElementEmpty) {
    rootMap.get(rootElement)?.unmount();
  }

  const root = ReactDOM.createRoot(rootElement);
  rootMap.set(rootElement, root);

  const galleryId: string | undefined =
    rootElement.getAttribute('data-gallery-id') || undefined;
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

  root.render(
    <React.StrictMode>
      <AppInfoProvider
        galleryId={galleryId}
        showControls={showControls}
        mode={'gallery'}
        baseUrl={getGlobal('rest_root')}
        nonce={getGlobal('rest_nonce')}
        pluginUrl={getGlobal('plugin_url')}
        pluginAssetsUrl={getGlobal('plugin_assets_url')}
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

/**
 * Mount the standalone settings UI for a gallery. The element must carry
 * `data-gallery-id`; the preview gallery may live in any same-origin frame.
 */
const addSettingsApplication = (rootElement: HTMLElement) => {
  unmountRoot(rootElement);

  const galleryId: string | undefined =
    rootElement.getAttribute('data-gallery-id') || undefined;
  if (!galleryId || galleryId === '0') {
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  rootMap.set(rootElement, root);

  const pluginVersion: string =
    rootElement.getAttribute('data-plugin-version') ||
    getGlobal('plugin_version') ||
    '';
  const mountedAt = String(Date.now());
  const getGalleryTimestamp = () =>
    rootElement.getAttribute('data-gallery-timestamp') || mountedAt;
  const getOptionsTimestamp = () =>
    rootElement.getAttribute('data-options-timestamp') || mountedAt;

  root.render(
    <React.StrictMode>
      <AppInfoProvider
        galleryId={galleryId}
        showControls={true}
        mode={'settings'}
        baseUrl={getGlobal('rest_root')}
        nonce={getGlobal('rest_nonce')}
        pluginUrl={getGlobal('plugin_url')}
        pluginAssetsUrl={getGlobal('plugin_assets_url')}
        pluginVersion={pluginVersion}
        getGalleryTimestamp={getGalleryTimestamp}
        getOptionsTimestamp={getOptionsTimestamp}
        optionsContainerSelector={''}
      >
        <App />
      </AppInfoProvider>
    </React.StrictMode>
  );
};

// Public API for host scripts (page builder integrations).
(window as any).reacg_mount_settings = (rootElement: HTMLElement) =>
  addSettingsApplication(rootElement);
(window as any).reacg_unmount_settings = (rootElement: HTMLElement) =>
  unmountRoot(rootElement);
(window as any).reacg_mount_gallery = (rootElement: HTMLElement) =>
  addApplication(rootElement);

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
let isLoadAppMounted: boolean = false;

/**
 * Hidden mount trigger for host scripts: set `data-id` to a gallery root id
 * and click it. Created on load even when the page has no gallery yet, so a
 * host (page builder canvas) that adds a gallery later can still mount it.
 * Prefer `window.reacg_mount_gallery(root)` in new code.
 */
const ensureLoadAppButton = () => {
  if (isLoadAppMounted || !document.body) {
    return;
  }
  if (document.getElementById('reacg-loadAppContainer')) {
    isLoadAppMounted = true;
    return;
  }
  const div = document.createElement('div');
  div.setAttribute('id', 'reacg-loadAppContainer');
  document.body.append(div);
  const rootElement = ReactDOM.createRoot(div);
  rootElement.render(
    <input
      type={'button'}
      id={'reacg-loadApp'}
      onClick={addApplicationById}
    ></input>
  );
  isLoadAppMounted = true;
};

const bootstrap = () => {
  ensureLoadAppButton();

  if (!isBootsrapped) {
    const galleryContainers: any[] = Array.from(
      document.getElementsByClassName('reacg-gallery') as any
    );
    const settingsContainers: HTMLElement[] = Array.from(
      document.getElementsByClassName('reacg-settings-app') as any
    );

    settingsContainers.forEach((container) => {
      if (!container.hasChildNodes()) {
        addSettingsApplication(container);
      }
    });

    if (galleryContainers?.length) {
      galleryContainers?.forEach((galleryContainer: any) => {
        addApplication(galleryContainer);
      });
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
