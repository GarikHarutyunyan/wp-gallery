import {useEffect} from 'react';
import {useRenderCount} from './useRenderCount';

export const useRenderCountLogger = (name = 'Component') => {
  const count = useRenderCount();
  useEffect(() => {
    console.log(`[${name}] render #${count}`);
  });
  return count;
};
