import {Button} from '@mui/material';
import clsx from 'clsx';
import {TitleAlignment} from 'data-structures';
import React from 'react';

interface IActionButtonProps {
  url?: string;
  openInNewTab?: boolean;
  text?: string;
  alignment?: TitleAlignment;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  borderSize?: number;
  borderColor?: string;
  borderRadius?: number;
  isOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  url = '',
  openInNewTab = false,
  text,
  alignment,
  backgroundColor,
  textColor,
  fontSize,
  borderSize,
  borderColor,
  borderRadius,
  isOnHover = false,
  className,
  style,
}) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Keep gallery click handlers from firing when interacting with action buttons.
    event.stopPropagation();

    if (!url) {
      return;
    }

    if (openInNewTab) {
      window?.open(url, '_blank')?.focus();
      return;
    }

    window?.open(url, '_self');
  };

  return (
    <Button
      onClick={onClick}
      className={clsx(
        'reacg-action-button',
        isOnHover && 'reacg-action-button_on-hover',
        className
      )}
      style={{
        display: 'block',
        backgroundColor,
        color: textColor,
        fontSize,
        borderWidth: borderSize,
        borderStyle: (borderSize || 0) > 0 ? 'solid' : 'none',
        borderColor,
        borderRadius,
        textTransform: 'none',
        marginLeft:
          alignment === 'center'
            ? 'auto'
            : alignment === 'right'
            ? 'auto'
            : '0',
        marginRight:
          alignment === 'center' ? 'auto' : alignment === 'left' ? 'auto' : '0',
        paddingLeft: '14px',
        paddingRight: '14px',
        ...style,
      }}
    >
      {text?.trim()
        ? text
        : (window as any).reacg_global?.text?.view_more || ''}
    </Button>
  );
};

export {ActionButton};
