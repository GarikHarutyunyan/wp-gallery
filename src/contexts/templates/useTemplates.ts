import {useContext} from 'react';
import {TemplatesContext} from './TemplatesContext';

const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (!context)
    throw new Error('useTemplates must be used within a TemplatesContext');

  return context;
};

export {useTemplates};
