import React from 'react';
import {MakedColorPicker} from 'core-components/color-picker/ColorPicker';

interface IColorControlProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorControl: React.FC<IColorControlProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <MakedColorPicker
      label={name}
      variant="standard"
      margin="none"
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};

export {ColorControl};
