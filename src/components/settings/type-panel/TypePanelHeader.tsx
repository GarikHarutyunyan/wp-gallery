import {Typography} from '@mui/material';
import React from 'react';

const TypePanelHeader: React.FC = () => {
  return (
    <Typography
      gutterBottom
      variant={'h5'}
      component={'div'}
      className={'type-panel_header'}
    >
      {'Type'}
    </Typography>
  );
};

export {TypePanelHeader};
