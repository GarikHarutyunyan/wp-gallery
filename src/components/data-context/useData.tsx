import {useContext} from 'react';
import {DataContext} from './DataContext';

const useData = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error('useData must be used within a SettingsContext');

  return context;
};

export {useData};
