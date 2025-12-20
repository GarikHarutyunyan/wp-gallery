import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from "./LabelWithTooltip";

interface INumberControlProps {
  id?: string;
  name: string;
  tooltip?: ReactNode;
  defaultValue?: number;
  value?: number;
  onChange: (value: number | undefined, id?: string) => void;
  min?: number;
  max?: number;
  unit?: string;
  step?: number;
}
const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
};

const NumberControl: React.FC<INumberControlProps> = ({
  id,
  name,
  tooltip,
  defaultValue,
  value,
  onChange,
  min,
  max,
  unit,
  step,
}) => {
  const onValueChange = (event: any) => {
    const value: number | undefined =
      event.target.value !== '' || !!event.target.value
        ? +event.target.value
        : undefined;

    onChange(value, id);
  };
  return (
    <TextField
      label={<LabelWithTooltip label={name} tooltip={tooltip} />}
      variant={'standard'}
      margin={'none'}
      type={'number'}
      defaultValue={defaultValue}
      value={value}
      onChange={onValueChange}
      fullWidth
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      InputProps={{
        inputProps: {min, max, step: step},
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        onWheel: numberInputOnWheelPreventChange,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export {NumberControl};
