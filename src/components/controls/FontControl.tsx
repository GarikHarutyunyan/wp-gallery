import {MenuItem, TextField} from '@mui/material';
import {GoogleFontsContext} from 'contexts/GoogleFontsContext';
import React, {ReactNode, useContext} from 'react';
import {LabelWithTooltip} from "./LabelWithTooltip";

interface IFontControlProps {
  id?: string;
  name: string;
  value: string;
  tooltip?: ReactNode;
  onChange: any;
  isDisabled?: boolean;
}

const FontControl: React.FC<IFontControlProps> = ({
  id,
  name,
  value,
  tooltip,
  onChange,
  isDisabled,
}) => {
  const {googleFonts} = useContext(GoogleFontsContext);

  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };

  return (
    <TextField
      select
      fullWidth
      label={<LabelWithTooltip label={name} tooltip={tooltip} />}
      variant="standard"
      margin="none"
      value={value}
      onChange={onValueChange}
      disabled={isDisabled}
    >
      {googleFonts?.map(({value, title}) => (
        <MenuItem key={value} value={value}>
          <span style={{fontFamily: value}}>{title}</span>
        </MenuItem>
      ))}
    </TextField>
  );
};

export {FontControl};
