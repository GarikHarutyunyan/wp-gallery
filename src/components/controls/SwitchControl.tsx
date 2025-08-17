import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from "./LabelWithTooltip";
import {InputLabel} from "@mui/material";
interface ISwitchControlProps {
  id?: string;
  name: string;
  value: boolean;
  label?: string;
  tooltip?: ReactNode;
  onChange: (value: boolean, id?: string) => void;
}

const SwitchControl: React.FC<ISwitchControlProps> = ({
  id,
  name,
  value,
  label,
  tooltip,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(!!event.target.checked, id);
  };

  return (
    <FormControl margin="none" fullWidth>
      <InputLabel shrink variant="standard">
        <LabelWithTooltip label={name} tooltip={tooltip} />
      </InputLabel>
      <Switch
          checked={value}
          onChange={onValueChange}
          sx={{mt: 2}} />
    </FormControl>
  );
};

export {SwitchControl};
