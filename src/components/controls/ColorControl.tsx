import {MakedColorPicker} from 'core-components/color-picker/ColorPicker';
import React from 'react';

interface IColorControlProps {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string, id?: string) => void;
}

const ColorControl: React.FC<IColorControlProps> = ({
  id,
  name,
  value,
  onChange,
}) => {
  const onValueChange = (value: any) => {
    onChange(value, id);
  };

  return (
    <MakedColorPicker
      label={name}
      variant="standard"
      margin="none"
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      onChange={onValueChange}
      fullWidth
    />
  );
};

export {ColorControl};
