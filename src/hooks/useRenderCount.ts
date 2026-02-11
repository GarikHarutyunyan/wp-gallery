import {useRef} from 'react';

type UseRenderCountOptions = {
  startAtZero?: boolean;
};

export const useRenderCount = (options: UseRenderCountOptions = {}) => {
  const {startAtZero = false} = options;

  const countRef = useRef(startAtZero ? -1 : 0);
  countRef.current += 1;

  return countRef.current;
};
