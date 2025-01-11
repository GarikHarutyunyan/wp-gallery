import {Popover} from '@mui/material';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useSettings} from '../useSettings';
import './feature-highlighter.css';

interface IFeatureHighlighterProps extends PropsWithChildren {
  text: string;
}

const FeatureHighlighter: React.FC<IFeatureHighlighterProps> = ({
  text,
  children,
}) => {
  const {imagesCount} = useSettings();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLElement>(null);
  const skipChecking = useRef<boolean>(false);

  useEffect(() => {
    if (!!imagesCount && !skipChecking.current) {
      const handleScrollend = (evt: any) => setIsOpen(true);

      window.addEventListener('scrollend', handleScrollend, {
        once: true,
      });
      (elementRef?.current as any)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      if (document.activeElement) {
        // blur active element if exist to avoid scrolling to focused element after backdrop cancelation
        (document.activeElement as any).blur?.();
      }
      skipChecking.current = true;

      return () => window.removeEventListener('scrollend', handleScrollend);
    }
  }, [imagesCount]);

  const renderChildren = () => {
    return React.cloneElement(children as ReactElement, {
      ref: elementRef,
      autoFocus: true,
    });
  };

  const handleClose = (): void => {
    setIsOpen(false);
    localStorage.setItem('reacg-highlight-templates-select', 'false');
  };

  return (
    <>
      {renderChildren()}
      <Popover
        open={isOpen}
        anchorEl={elementRef?.current as any}
        anchorReference={'anchorEl'}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              'marginLeft': '-10px',
              'padding': '10px',
              'overflow': 'visible',
              'backgroundColor': ' #FEF9AE',
              'width': '200px',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 8,
                right: -4,
                width: 10,
                height: 10,
                backgroundColor: 'inherit',
                transform: 'rotate(45deg)',
              },
            },
          },
        }}
        className={'feature-highlighter'}
      >
        {text}
      </Popover>
    </>
  );
};

export {FeatureHighlighter};
