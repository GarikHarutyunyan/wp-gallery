import {TextField} from '@mui/material';
import React from 'react';

interface ITextControlProps {
  id: string;
  name: string;
  value: string;
  onChange: any;
}

const TextControl: React.FC<ITextControlProps> = ({
  id,
  name,
  value,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };
  return (
    <TextField
      label={name}
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
