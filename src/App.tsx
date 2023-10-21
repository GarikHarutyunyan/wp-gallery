import React from 'react';
import './App.css';
import Gallery from './components/Gallery';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider >
      <Gallery />
    </SnackbarProvider>
    // <div style={{width:'800px', margin: '0 auto'}}>
    //   <Gallery2 />
    // </div>
  );
}

export default App;
