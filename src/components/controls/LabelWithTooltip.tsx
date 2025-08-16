import React, { ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Aligner } from 'core-components';
import './control.css';

interface ILabelWithTooltipProps {
  label?: string;
  tooltip?: ReactNode;
}

export const LabelWithTooltip: React.FC<ILabelWithTooltipProps> = ({ label, tooltip }) => {
  if (!label) return null;
  if (!tooltip) return <>{label}</>;
  return (
      <Aligner gap={4}>
        {label}
        <Tooltip title={tooltip}>
          <InfoOutlinedIcon
              fontSize="small"
              className={"LabelWithTooltipIcon"}
          />
        </Tooltip>
      </Aligner>
  );
};