import {Typography} from '@mui/material';
import clsx from 'clsx';
import {ProIcon} from 'components/alert-dialog/icons/ProIcon';
import {usePro} from 'contexts/ProContext';
import {GalleryType} from 'data-structures';
import React, {ReactElement} from 'react';

interface ITypeOptionProps {
  title: string;
  image: ReactElement;
  value: GalleryType;
  isSelected: boolean;
  requiresPro?: boolean;
  onClick?: (value: GalleryType) => void;
}

const TypeOption: React.FC<ITypeOptionProps> = ({
  title,
  image,
  value,
  isSelected,
  requiresPro,
  onClick,
}) => {
  const {isPro, isLoaded} = usePro();

  const onOptionClick = () => {
    if (requiresPro && !isLoaded) {
      return;
    }

    if (requiresPro && !isPro) {
      (window as any).reacg_open_premium_offer_dialog?.({
        utm_medium: `layout_${value}`,
      });
      return;
    }

    onClick?.(value);
  };

  return (
    <div
      onClick={onOptionClick}
      className={clsx('type-option', {
        'type-option__active': isSelected,
        'type-option__locked': requiresPro && isLoaded && !isPro,
      })}
    >
      <Typography
        variant={'subtitle1'}
        component={'div'}
        align={'center'}
        className={'type-option__title'}
      >
        {title}
      </Typography>
      <div className={'type-option__image-container'}>
        {requiresPro && isLoaded && !isPro && (
          <span className={'type-option__pro-badge'}>
            <ProIcon />
          </span>
        )}
        {image}
      </div>
    </div>
  );
};

export {TypeOption};
