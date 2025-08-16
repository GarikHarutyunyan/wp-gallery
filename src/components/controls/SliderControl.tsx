import {FormControl, InputLabel, Slider} from '@mui/material';
import React, {ReactNode, useState} from 'react';
import {LabelWithTooltip} from "./LabelWithTooltip";

interface ISliderControlProps {
  id?: string;
  name: string;
  tooltip?: ReactNode;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number, id?: string) => void;
  disabled?: boolean;
}

const SliderControl: React.FC<ISliderControlProps> = ({
  id,
  name,
  tooltip,
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);

  const onValueChange = (e: any, value: any) =>
    onChange(typeof value === 'number' ? value : value[0], id);

  return (
    <FormControl margin="none" fullWidth>
      <InputLabel shrink variant="standard" focused={focused}>
        {<LabelWithTooltip label={name} tooltip={tooltip} />}
      </InputLabel>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        size="small"
        valueLabelDisplay="auto"
        marks={[
          {value: min, label: `${min}`},
          {value: max, label: `${max}`},
        ]}
        onChange={onValueChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{mt: 2}}
      />
    </FormControl>
  );
};

export {SliderControl};
