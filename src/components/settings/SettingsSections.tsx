import createCache, {EmotionCache} from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {Divider} from '@mui/material';
import {useAppInfo} from 'contexts';
import {Section} from 'core-components/section';
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';
import {clsx} from 'yet-another-react-lightbox';
import {OptionsPanelBody} from './OptionsPanelBody';
import './settings-context.css';
import {TypePanel} from './type-panel/TypePanel';
import {useSettings} from './useSettings';

interface ISettingsSectionsProps {
  isLoading: boolean;
  onTypeChange: any;
  onSave: any;
  onReset: any;
}

const SettingsSections: React.FC<ISettingsSectionsProps> = ({
  isLoading,
  onTypeChange,
  onSave,
  onReset,
}) => {
  const {hasChanges} = useSettings();
  const {optionsContainerSelector} = useAppInfo();

  // Wrapper used to find the nearest .reacg-wrapper ancestor instead of querying the whole document
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const beforeUnloadCallback = (event: any) => {
      if (hasChanges) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', beforeUnloadCallback);

    return () =>
      window.removeEventListener('beforeunload', beforeUnloadCallback);
  }, [hasChanges]);

  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false);

  useEffect(() => {
    const resize = () => {
      const parentElement =
        (wrapperRef.current?.closest('.reacg-wrapper') as HTMLElement | null) ??
        (document.querySelector('.reacg-wrapper') as HTMLElement | null);

      if (parentElement) {
        const parentWidth = parentElement.getBoundingClientRect().width;
        setIsMedium(parentWidth > 480 && parentWidth < 730);
        setIsSmall(parentWidth > 340 && parentWidth <= 480);
        setIsExtraSmall(parentWidth <= 340);
      }
    };

    // Initial check.
    resize();

    // Observe size changes on the nearest preview wrapper (or fallback to window resize).
    const observedElement =
      (wrapperRef.current?.closest('.reacg-wrapper') as HTMLElement | null) ??
      (document.querySelector('.reacg-wrapper') as HTMLElement | null) ??
      wrapperRef.current;

    let ro: ResizeObserver | null = null;
    if (observedElement && (window as any).ResizeObserver) {
      ro = new ResizeObserver(() => resize());
      ro.observe(observedElement as Element);
    } else {
      // Fallback for older browsers.
      window.addEventListener('resize', resize);
    }

    // Cleanup observer or listener on unmount.
    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }
    };
  }, []);

  const content: ReactElement = (
    <div ref={wrapperRef}>
      <TypePanel
        isMedium={isMedium}
        isSmall={isSmall}
        isExtraSmall={isExtraSmall}
        onTypeChange={onTypeChange}
      />
      <Divider variant={'middle'} />
      <Section
        body={
          <OptionsPanelBody
            isLoading={isLoading}
            onSave={onSave}
            onReset={onReset}
          />
        }
        outlined={false}
        className={clsx(
          'reacg-settings',
          isMedium ? 'reacg-settings--m' : '',
          isSmall ? 'reacg-settings--s' : '',
          isExtraSmall ? 'reacg-settings--xs' : ''
        )}
      />
    </div>
  );

  // 1) Find container (same logic you already have)
  const containerElement = useMemo<HTMLElement | null>(() => {
    if (!optionsContainerSelector) return null;

    const docElement = document.querySelector(
      optionsContainerSelector
    ) as HTMLElement | null;
    // eslint-disable-next-line no-restricted-globals
    const parentElement = parent?.document.querySelector(
      optionsContainerSelector
    ) as HTMLElement | null;

    return docElement || parentElement || null;
  }, [optionsContainerSelector]);

  // 2) Create a stable mount node inside container, clear container ONLY once
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!containerElement) {
      setPortalTarget(null);
      return;
    }

    const INIT_ATTR = 'data-reacg-settings-initialized';
    const ROOT_SELECTOR = '[data-reacg-settings-root="true"]';

    // Reuse existing root if already created (also helps when StrictMode re-mounts)
    let root = containerElement.querySelector(
      ROOT_SELECTOR
    ) as HTMLElement | null;

    if (!root) {
      // Clear only the first time for this container
      if (!containerElement.hasAttribute(INIT_ATTR)) {
        while (containerElement.firstChild) {
          containerElement.removeChild(containerElement.firstChild);
        }
        containerElement.setAttribute(INIT_ATTR, '1');
      }

      root = document.createElement('div');
      root.setAttribute('data-reacg-settings-root', 'true');
      containerElement.appendChild(root);
    }

    setPortalTarget(root);
  }, [containerElement]);

  // 3) Emotion cache should point to container (where style tags will be injected)
  const cache = useMemo<EmotionCache | null>(() => {
    if (!containerElement) return null;

    return createCache({
      key: 'reacg-settings',
      container: containerElement,
      prepend: true,
    });
  }, [containerElement]);

  // 4) Portal into the mount node
  if (portalTarget && cache) {
    return createPortal(
      <CacheProvider value={cache}>{content}</CacheProvider>,
      portalTarget
    );
  }

  return content;
};

export default SettingsSections;
