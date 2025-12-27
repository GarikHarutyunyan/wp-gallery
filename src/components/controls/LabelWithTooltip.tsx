import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import {ProIcon} from 'components/alert-dialog/icons/ProIcon';
import {Aligner} from 'core-components';
import React, {ReactNode} from 'react';

interface ILabelWithTooltipProps {
  label?: string;
  tooltip?: ReactNode;
  pro?: boolean;
}

export const LabelWithTooltip: React.FC<ILabelWithTooltipProps> = ({
  label,
  tooltip,
  pro,
}) => {
  if (!label) return null;
  if (!tooltip)
    return (
      <>
        {label}
        {pro && <ProIcon style={{marginBottom: '-10px'}} />}
      </>
    );
  return (
    <Aligner gap={4}>
      {label}
      <Tooltip title={tooltip}>
        <InfoOutlinedIcon
          fontSize="small"
          className={'seetings__cursor_pointer'}
        />
      </Tooltip>
      {pro && <ProIcon style={{marginTop: '-2px'}} />}
    </Aligner>
  );
};
