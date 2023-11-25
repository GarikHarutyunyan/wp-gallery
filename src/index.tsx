import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactDOM2 from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const addApplication = (rootElement: HTMLElement) => {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App id={rootElement.id} />
    </React.StrictMode>
  );
};

const addApplicationById = () => {
  const id: string | undefined = document.getElementById('reacg-loadApp')?.id;
  const rootElement: HTMLElement | null = id
    ? document.getElementById(id)
    : null;

  rootElement && addApplication(rootElement);
};

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainers: any[] = Array.from(
    document.getElementsByClassName('aig-gallery') as any
  );

  galleryContainers?.forEach((galleryContainer: any) => {
    addApplication(galleryContainer);
  });
  ReactDOM2.createPortal(
    <button id={'reacg-loadApp'} onClick={addApplicationById}></button>,
    document.querySelector('body') as Element
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
