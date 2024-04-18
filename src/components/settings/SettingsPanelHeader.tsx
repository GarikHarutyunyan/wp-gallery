import {Typography} from '@mui/material';
import React from 'react';

const SettingsPanelHeader: React.FC = () => {
  return (
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      className={'settings-panel_header'}
    >
      {'Options'}
    </Typography>
  );
};

export {SettingsPanelHeader};
