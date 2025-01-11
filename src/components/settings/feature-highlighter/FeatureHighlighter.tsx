import {ClickAwayListener, Tooltip} from '@mui/material';
import {Aligner} from 'core-components';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {BulbIcon} from './BulbIcon';
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
    return React.cloneElement(children as ReactElement);
  };

  const handleClose = (): void => {
    setIsOpen(false);
    localStorage.setItem('reacg-highlight-templates-select', 'false');
  };

  const renderTitle = (): ReactElement => {
    return (
      <Aligner gap={8}>
        <span style={{display: 'flex', alignItems: 'center'}}>
          <BulbIcon />
        </span>
        {text}
      </Aligner>
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Tooltip
        ref={elementRef}
        title={renderTitle()}
        open={isOpen}
        placement={'left'}
        onClose={handleClose}
        arrow
        slotProps={{
          tooltip: {
            sx: {
              marginLeft: '-10px',
              padding: '16px',
              overflow: 'visible',
              backgroundColor: ' #1A76D2',
              fontSize: '0.875rem',
              lineHeight: '1.43',
              letterSpacing: '0.01071em',
              width: '272px',
              color: '#FFF',
              borderRadius: '12px',
              fontFamily: 'lexend',
            },
          },
          arrow: {
            sx: {
              color: ' #1A76D2',
              width: '15px !important',
              height: '15px !important',
            },
          },
        }}
      >
        {renderChildren()}
      </Tooltip>
    </ClickAwayListener>
  );
};

export {FeatureHighlighter};
