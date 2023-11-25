import React from 'react';
import './App.css';
import Gallery from './components/Gallery';
import {SnackbarProvider} from 'notistack';

function App({id}: any) {
  return (
    <SnackbarProvider>
      <Gallery id={id} />
    </SnackbarProvider>
  );
}

export default App;
