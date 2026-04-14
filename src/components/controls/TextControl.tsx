import {TextField} from '@mui/material';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from './LabelWithTooltip';

interface ITextControlProps {
  id: string;
  name: string;
  placeholder?: string;
  tooltip?: ReactNode;
  value: string;
  onChange: any;
  pro?: boolean;
}

const TextControl: React.FC<ITextControlProps> = ({
  id,
  name,
  placeholder,
  tooltip,
  value,
  onChange,
  pro,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };

  return (
    <TextField
      label={<LabelWithTooltip label={name} tooltip={tooltip} pro={pro} />}
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
