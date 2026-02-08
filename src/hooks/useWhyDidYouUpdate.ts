import {useEffect, useRef} from 'react';

type AnyObj = Record<string, any>;

type Options = {
  /** log on mount too (by default it logs only from the 2nd render) */
  logOnMount?: boolean;
  /** custom logger (defaults to console.log) */
  logger?: (...args: any[]) => void;
};

export const useWhyDidYouUpdate = (
  name: string,
  values: AnyObj,
  options: Options = {}
) => {
  const {logOnMount = false, logger = console.log} = options;
  const prevRef = useRef<AnyObj | null>(null);

  useEffect(() => {
    const prev = prevRef.current;

    if (!prev) {
      prevRef.current = values;
      if (logOnMount) logger(`[${name}] mounted`, values);
      return;
    }

    const allKeys = new Set([...Object.keys(prev), ...Object.keys(values)]);
    const changes: Record<string, {from: unknown; to: unknown}> = {};

    allKeys.forEach((key) => {
      if (!Object.is(prev[key], values[key])) {
        changes[key] = {from: prev[key], to: values[key]};
      }
    });

    if (Object.keys(changes).length) {
      logger(`[${name}] changed:`, changes);
    }

    prevRef.current = values;
  });
};
