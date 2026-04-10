import {MakedColorPicker} from 'core-components/color-picker/ColorPicker';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from './LabelWithTooltip';

interface IColorControlProps {
  id?: string;
  name: string;
  value: string;
  tooltip?: ReactNode;
  pro?: boolean;
  onChange: (value: string, id?: string) => void;
}

const ColorControl: React.FC<IColorControlProps> = ({
  id,
  name,
  value,
  tooltip,
  pro,
  onChange,
}) => {
  const onValueChange = (value: any) => {
    onChange(value, id);
  };

  return (
    <MakedColorPicker
      label={<LabelWithTooltip label={name} tooltip={tooltip} pro={pro} />}
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
