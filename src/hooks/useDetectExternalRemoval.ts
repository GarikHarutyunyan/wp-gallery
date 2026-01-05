import {useEffect, useRef} from 'react';

type UseDetectExternalRemovalOptions = {
  /** Root to observe. If not provided, will observe document.body (when available). */
  container?: Node | null;
  /** Called when the element becomes disconnected from the document */
  onRemoved?: () => void;
  /** Call onRemoved only once (default true) */
  once?: boolean;
  /** Extra guard: you can pause detection temporarily */
  enabled?: boolean;
};

/**
 * Detects if a DOM node (from a ref) is removed from the document by something
 * outside React (e.g., devtools, host page, WP builder, etc.).
 *
 * It observes mutations on a container (or document.body) and checks node.isConnected.
 */
export function useDetectExternalRemoval<T extends Element>(
  targetRef: React.RefObject<T>,
  {
    container,
    onRemoved,
    once = true,
    enabled = true,
  }: UseDetectExternalRemovalOptions = {}
) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const node = targetRef.current;
    if (!node) return;

    // pick an observation root that is stable
    const root: Node | null =
      container ?? (typeof document !== 'undefined' ? document.body : null);

    if (!root) return;

    firedRef.current = false;

    const check = () => {
      if (!node.isConnected) {
        if (once && firedRef.current) return;
        firedRef.current = true;
        onRemoved?.();
      }
    };

    const obs = new MutationObserver(check);
    obs.observe(root, {childList: true, subtree: true});

    // initial check (in case it was already removed)
    check();

    return () => obs.disconnect();
  }, [targetRef, container, onRemoved, once, enabled]);
}
