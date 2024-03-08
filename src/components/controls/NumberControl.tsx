import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';

interface INumberControlProps {
  id?: string;
  name: string;
  value?: number;
  onChange: (value: number | undefined, id?: string) => void;
  min?: number;
  max?: number;
  unit?: string;
}

const NumberControl: React.FC<INumberControlProps> = ({
  id,
  name,
  value,
  onChange,
  min,
  max,
  unit,
}) => {
  const onValueChange = (event: any) => {
    const value: number | undefined =
      event.target.value !== '' || !!event.target.value
        ? +event.target.value
        : undefined;

    onChange(value, id);
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
      InputProps={{
        inputProps: {min, max},
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export {NumberControl};
