import {Typography} from '@mui/material';
import {useAppInfo} from 'contexts/AppInfoContext';
import {GalleryType} from 'data-structures';
import React from 'react';
import clsx from "clsx";

const activeColor: string = '#135C92';
const inactiveColor: string = '#86A3B8';

interface ITypeOptionProps {
  title: string;
  svg: string;
  value: GalleryType;
  isSelected: boolean;
  onClick?: (value: GalleryType) => void;
}

const TypeOption: React.FC<ITypeOptionProps> = ({
  title,
  svg,
  value,
  isSelected,
  onClick,
}) => {
  const {pluginUrl} = useAppInfo();

  const onOptionClick = () => {
    onClick?.(value);
  };

  return (
    <div onClick={onOptionClick} className={clsx('type-option', {'type-option__active' : isSelected })}>
      <Typography
        variant={'subtitle1'}
        component={'div'}
        align={'center'}
        className={'type-option__title'}
      >
        {title}
      </Typography>
      <div className={'type-option__image-container'} dangerouslySetInnerHTML={{ __html: svg }}></div>
    </div>
  );
};

export {TypeOption};
