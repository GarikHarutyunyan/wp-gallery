import {MenuItem, TextField} from '@mui/material';
import React from 'react';

interface INumberControlProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberControl: React.FC<INumberControlProps> = ({
  name,
  value,
  onChange,
  min,
  max,
}) => {
  const onValueChange = (event: any) => {
    onChange(+event.target.value);
  };
  return (
    <TextField
      label={name}
      variant="standard"
      margin="none"
      type="number"
      value={value}
      onChange={onValueChange}
      fullWidth
      InputProps={{inputProps: {min, max}}}
    />
  );
};

export {NumberControl};
