import {ClickAwayListener, Tooltip} from '@mui/material';
import {Aligner} from 'core-components/aligner';
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
  const elementRef = useRef<HTMLDivElement>(null);
  const skipChecking = useRef<boolean>(false);

  useEffect(() => {
    const highlightFeature = () => {
      if (!skipChecking.current) {
        const handleScrollend = () => {
          window.clearTimeout(fallbackOpenTimeout);
          setIsOpen(true);
        };
        const fallbackOpenTimeout = window.setTimeout(handleScrollend, 500);

        window.addEventListener('scrollend', handleScrollend, {
          once: true,
        });
        const targetElement = elementRef.current;
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const isMostlyVisible =
            rect.top >= viewportHeight * 0.15 &&
            rect.bottom <= viewportHeight * 0.85;

          if (!isMostlyVisible) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          } else {
            window.clearTimeout(fallbackOpenTimeout);
            setIsOpen(true);
          }
        }
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
    <ClickAwayListener onClickAway={isOpen ? handleClose : () => {}}>
      <Tooltip
        classes={{popper: 'reacg-feature-highlighter'}}
        title={renderTitle()}
        open={isOpen}
        placement={'left'}
        arrow
        slotProps={{
          tooltip: {
            sx: {
              marginLeft: '-10px',
              padding: '16px',
              overflow: 'visible',
              backgroundColor: '#5A558C',
              fontSize: '0.875rem',
              lineHeight: '1.43',
              letterSpacing: '0.01071em',
              width: '272px',
              color: '#FFF',
              borderRadius: '12px',
              fontFamily: 'lexend',
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;',
            },
          },
          arrow: {
            sx: {
              color: '#5A558C',
              width: '15px !important',
              height: '24px !important',
              marginRight: '-12px !important',
            },
          },
          popper: {
            disablePortal: true,
          },
        }}
      >
        <div ref={elementRef} className={'reacg-feature-highlighter__anchor'}>
          {children}
        </div>
      </Tooltip>
    </ClickAwayListener>
  );
};

export {FeatureHighlighter};
