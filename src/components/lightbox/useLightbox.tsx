import React from 'react';
import {LightboxContext} from './LightboxContext';

const useLightbox = () => {
  const context = React.useContext(LightboxContext);
  if (!context)
    throw new Error('useLightbox must be used within a LightboxContext');

  return context;
};

export {useLightbox};
