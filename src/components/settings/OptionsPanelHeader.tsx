import {Typography} from '@mui/material';
import React from 'react';

const OptionsPanelHeader: React.FC = () => {
  return (
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      className={'options-panel_header'}
    >
      {'Options'}
    </Typography>
  );
};

export {OptionsPanelHeader};
