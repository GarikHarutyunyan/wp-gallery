import {AppInfoProvider} from 'contexts/AppInfoContext';
import React from 'react';
import ReactDOM2 from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';

const addApplication = (rootElement: HTMLElement) => {
  const root = ReactDOM.createRoot(rootElement);
  const galleryId: string | undefined =
    rootElement.getAttribute('data-gallery-id') || undefined;
  const baseUrl: string | undefined = (window as any).reacg_global?.rest_root;
  const nonce: string | undefined = (window as any).reacg_global?.rest_nonce;
  const pluginUrl: string | undefined = (window as any).reacg_global
    ?.plugin_url;

  root.render(
    <React.StrictMode>
      <AppInfoProvider
        galleryId={galleryId}
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

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainers: any[] = Array.from(
    document.getElementsByClassName('reacg-gallery') as any
  );

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
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
