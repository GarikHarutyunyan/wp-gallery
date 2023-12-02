import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface ISwitchControlProps {
  name: string;
  value: boolean;
  label?: string;
  onChange: (value: boolean) => void;
}

const SwitchControl: React.FC<ISwitchControlProps> = ({
  name,
  value,
  label,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(!!event.target.checked);
  };
  return (
    <FormControl>
      <FormLabel component={'label'} style={{fontSize: '12px'}}>
        {name}
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
