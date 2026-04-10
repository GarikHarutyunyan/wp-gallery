import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, {ReactNode} from 'react';
import {LabelWithTooltip} from './LabelWithTooltip';

interface IPositionOption {
  title: string;
  value: string;
}

interface IPositionControlProps {
  id: string;
  name: string;
  tooltip?: ReactNode;
  value: string;
  onChange: any;
  options: IPositionOption[];
}

const PositionControl: React.FC<IPositionControlProps> = ({
  id,
  name,
  tooltip,
  value,
  onChange,
  options,
}) => {
  const onValueChange = (event: any) => {
    onChange(event.target.value, id);
  };

  return (
    <FormControl margin="none" fullWidth>
      <InputLabel shrink variant="standard">
        <LabelWithTooltip label={name} tooltip={tooltip} />
      </InputLabel>
      <RadioGroup value={value} onChange={onValueChange} name={id}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mt={3}>
          {options.map((pos) => (
            <FormControlLabel
              key={pos.value}
              title={pos.title}
              value={pos.value}
              control={
                <Radio
                  sx={{
                    'p': 0.5,
                    '& .MuiSvgIcon-root': {
                      fontSize: 18,
                    },
                  }}
                />
              }
              label={''}
              sx={{
                'border': '1px solid #ccc',
                '&:hover': {borderColor: '#1976d2'},
                'backgroundColor':
                  value === pos.value
                    ? 'rgba(25, 118, 210, 0.1)'
                    : 'transparent',
                'justifyContent': 'center',
                'margin': 0,
              }}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export {PositionControl, type IPositionOption};
