import {MenuItem, TextField} from '@mui/material';
import React, {CSSProperties} from 'react';
import './select-control.css';

interface ISelectOption {
  title: string;
  value: string;
  isDisabled?: boolean;
}

export enum ReSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

interface ISelectControlProps {
  id?: string;
  name?: string;
  value: string | number;
  options: ISelectOption[];
  onChange: any;
  isDisabled?: boolean;
  hideLabel?: boolean;
  size?: ReSize;
  style?: CSSProperties;
}

const SelectControl: React.FC<ISelectControlProps> = ({
  id,
  name,
  value,
  options,
  onChange,
  isDisabled,
  hideLabel,
  size,
  style,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };

  return (
    <TextField
      select
      fullWidth
      label={!hideLabel ? name : undefined}
      variant={'standard'}
      margin={'none'}
      value={value}
      onChange={onValueChange}
      disabled={isDisabled}
      style={style}
      size={size}
      hiddenLabel={hideLabel}
    >
      {options.map(({value, title, isDisabled}) => (
        <MenuItem key={value} value={value} disabled={isDisabled}>
          {title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export {SelectControl, type ISelectOption};
