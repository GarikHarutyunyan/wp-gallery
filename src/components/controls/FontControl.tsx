import {MenuItem, TextField} from '@mui/material';
import {GoogleFontsContext} from 'contexts/GoogleFontsContext';
import React, {useContext} from 'react';

interface IFontControlProps {
  id?: string;
  name: string;
  value: string;
  onChange: any;
  isDisabled?: boolean;
}

const FontControl: React.FC<IFontControlProps> = ({
  id,
  name,
  value,
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
      label={name}
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
