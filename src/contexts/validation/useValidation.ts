import {useContext} from 'react';
import {ValidationContext} from './ValidationContext';

const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context)
    throw new Error('useValidation must be used within a ValidationContext');

  return context;
};

export {useValidation};
