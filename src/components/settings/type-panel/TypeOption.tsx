import {Typography} from '@mui/material';
import clsx from 'clsx';
import {GalleryType} from 'data-structures';
import React, {ReactElement} from 'react';

interface ITypeOptionProps {
  title: string;
  image: ReactElement;
  value: GalleryType;
  isSelected: boolean;
  onClick?: (value: GalleryType) => void;
}

const TypeOption: React.FC<ITypeOptionProps> = ({
  title,
  image,
  value,
  isSelected,
  onClick,
}) => {
  const onOptionClick = () => {
    onClick?.(value);
  };
  return (
    <div
      onClick={onOptionClick}
      className={clsx('type-option', {'type-option__active': isSelected})}
    >
      <Typography
        variant={'subtitle1'}
        component={'div'}
        align={'center'}
        className={'type-option__title'}
      >
        {title}
      </Typography>
      <div className={'type-option__image-container'}>{image}</div>
    </div>
  );
};

export {TypeOption};
