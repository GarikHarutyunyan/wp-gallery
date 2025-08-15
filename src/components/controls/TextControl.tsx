import {TextField} from '@mui/material';
import React from 'react';

interface ITextControlProps {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: any;
}

const TextControl: React.FC<ITextControlProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };
  return (
    <TextField
      label={name}
      placeholder={placeholder}
      variant="standard"
      margin="none"
      value={value}
      onChange={onValueChange}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export {TextControl};
