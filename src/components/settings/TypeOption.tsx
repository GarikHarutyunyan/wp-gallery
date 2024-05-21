import {Typography} from '@mui/material';
import {AppInfoContext} from 'contexts/AppInfoContext';
import {GalleryType} from 'data-structures';
import React, {useContext} from 'react';

const activeColor: string = '#135C92';
const inactiveColor: string = '#86A3B8';

interface ITypeOptionProps {
  title: string;
  value: GalleryType;
  isSelected: boolean;
  onClick: (value: GalleryType) => void;
}

const TypeOption: React.FC<ITypeOptionProps> = ({
  title,
  value,
  isSelected,
  onClick,
}) => {
  const {pluginUrl} = useContext(AppInfoContext);

  const onOptionClick = () => {
    onClick(value);
  };

  return (
    <div onClick={onOptionClick} className={'type-option'}>
      <Typography
        variant={'subtitle1'}
        component={'div'}
        color={isSelected ? activeColor : inactiveColor}
        align={'center'}
        className={'type-option__title'}
      >
        {title}
      </Typography>
      <div className={'type-option__image-container'}>
        <img
          style={{
            backgroundColor: isSelected ? activeColor : inactiveColor,
          }}
          src={`${pluginUrl}/assets/images/${value}.png`}
          className={'type-option__image'}
        />
      </div>
    </div>
  );
};

export {TypeOption};
