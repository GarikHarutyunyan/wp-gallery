import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import {Aligner} from 'core-components';
import React, {ReactNode} from 'react';
interface ISwitchControlProps {
  id?: string;
  name: string;
  value: boolean;
  label?: string;
  info?: ReactNode;
  onChange: (value: boolean, id?: string) => void;
}

const SwitchControl: React.FC<ISwitchControlProps> = ({
  id,
  name,
  value,
  label,
  info,
  onChange,
}) => {
  const onValueChange = (event: any) => {
    onChange(!!event.target.checked, id);
  };

  const renderLabel = (): ReactNode => {
    const label: string | undefined = name;
    if (!info) {
      return label;
    } else {
      return (
        <Aligner gap={4}>
          {label}
          {renderInfo()}
        </Aligner>
      );
    }
  };

  const renderInfo = () => {
    return (
      <Tooltip title={info}>
        <InfoOutlinedIcon
          fontSize={'small'}
          style={{cursor: 'pointer', fontSize: '15px'}}
        />
      </Tooltip>
    );
  };

  return (
    <FormControl>
      <FormLabel component={'label'} style={{fontSize: '12px'}}>
        {renderLabel()}
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
