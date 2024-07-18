import {MenuItem, TextField} from '@mui/material';
import React, {CSSProperties} from 'react';

interface ISelectOption {
  title: string;
  value: string;
  isDisabled?: boolean;
}

interface ISelectControlProps {
  id?: string;
  name: string;
  value: string;
  options: ISelectOption[];
  onChange: any;
  isDisabled?: boolean;
  style?: CSSProperties;
}

const SelectControl: React.FC<ISelectControlProps> = ({
  id,
  name,
  value,
  options,
  onChange,
  isDisabled,
  style,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };

  return (
    <TextField
      select
      fullWidth
      label={name}
      variant="standard"
      margin="none"
      value={value}
      onChange={onValueChange}
      disabled={isDisabled}
      style={style}
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
