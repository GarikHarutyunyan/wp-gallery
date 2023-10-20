import {MenuItem, TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface INumberControlProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

const NumberControl: React.FC<INumberControlProps> = ({
  name,
  value,
  onChange,
  min,
  max,
  unit,
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
