import {MenuItem, TextField} from '@mui/material';
import React from 'react';

interface ISelectOption {
  title: string;
  value: string;
}

interface ISelectControlProps {
  name: string;
  value: string;
  options: ISelectOption[];
  onChange: any;
}

const SelectControl: React.FC<ISelectControlProps> = ({
  name,
  value,
  options,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value);
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
    >
      {options.map(({value, title}) => (
        <MenuItem key={value} value={value}>
          {title}
        </MenuItem>
      ))}
    </TextField>
  );
};

export {SelectControl};
