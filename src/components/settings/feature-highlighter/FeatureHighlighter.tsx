import {Popover} from '@mui/material';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import './feature-highlighter.css';

interface IFeatureHighlighterProps extends PropsWithChildren {
  text: string;
}

const FeatureHighlighter: React.FC<IFeatureHighlighterProps> = ({
  text,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLElement>(null);
  const skipChecking = useRef<boolean>(false);

  useEffect(() => {
    const highlightFeature = (e: any) => {
      if (!skipChecking.current) {
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
      }
    };

    window.addEventListener(
      'highlight-template-select',
      highlightFeature,
      false
    );

    return () =>
      window.removeEventListener('highlight-template-select', highlightFeature);
  }, []);

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
          vertical: 'center',
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
                top: 'calc(50% - 8px)',
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
