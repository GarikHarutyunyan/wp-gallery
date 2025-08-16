import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from "./LabelWithTooltip";
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
    <FormControl>
      <FormLabel component={'label'} className={"SwitchControlLabel"}>
        {<LabelWithTooltip label={name} tooltip={tooltip} />}
      </FormLabel>
      <FormControlLabel
        control={<Switch checked={value} onChange={onValueChange} />}
        label={label}
        style={{margin: '-5px'}}
      />
    </FormControl>
  );
};

export {SwitchControl};
