import React from 'react';
import {SettingsContext} from './SettingsContext';

const useSettings = () => {
  const context = React.useContext(SettingsContext);
  // if (!context)
  //   throw new Error('useSettings must be used within a SettingsContext');
  return context;
};

export {useSettings};
