import {Divider} from '@mui/material';
import {useAppInfo} from 'contexts';
import {Section} from 'core-components/section';
import ErrorFallback from 'ErrorFallback';
import React, {lazy, ReactElement, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {clsx} from 'yet-another-react-lightbox';
import {OptionsPanelBody} from './OptionsPanelBody';
import './settings-context.css';
import {TypePanel} from './type-panel/TypePanel';
import {useSettings} from './useSettings';

const AlertDialog = lazy(() => import('components/alert-dialog/AlertDialog'));

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
      // Prefer the nearest .reacg-wrapper ancestor to support multiple previews on the page
      const parentElement =
        (wrapperRef.current?.closest('.reacg-wrapper') as HTMLElement | null) ??
        document.querySelector('.reacg-wrapper');
      if (parentElement) {
        const parentWidth = (
          parentElement as HTMLElement
        ).getBoundingClientRect().width;
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

  // Wrapper used to find the nearest .reacg-wrapper ancestor instead of querying the whole document
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const content: ReactElement = (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AlertDialog />
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
    </ErrorBoundary>
  );

  if (optionsContainerSelector) {
    const containerElement = document.querySelector(optionsContainerSelector);

    if (containerElement) {
      return createPortal(content, containerElement);
    }
  }

  return content;
};

export default SettingsSections;
