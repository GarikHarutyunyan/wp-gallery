import {MenuItem, TextField} from '@mui/material';
import React from 'react';

interface ITextControlProps {
  name: string;
  value: string;
  onChange: any;
}

const TextControl: React.FC<ITextControlProps> = ({name, value, onChange}) => {
  return (
    <TextField
      label={name}
      variant="standard"
      margin="none"
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export {TextControl};
