import {useEffect, useRef} from 'react';

const useUpdateEffect = (effect: () => void, deps: any[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return effect();
  }, deps);
};

export default useUpdateEffect;
