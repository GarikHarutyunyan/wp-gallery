import {RefObject, useLayoutEffect, useState} from 'react';

export function useObservedTextHeight<T extends HTMLElement>(
  ref: RefObject<T>,
  showTitle: boolean,
  showDescription: boolean,
  showCaption: boolean
) {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => setHeight(el.offsetHeight);

    // measure immediately
    updateHeight();

    // observe dynamic changes
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);

    return () => ro.disconnect();
  }, [ref.current, showTitle, showDescription, showCaption]); // <--- run when ref becomes non-null

  return height;
}
