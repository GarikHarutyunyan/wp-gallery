import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {ShareImageConfig} from './ShareDIalog.types';

const ShareButton: React.FC<ShareImageConfig> = ({url, title}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    (window as any).reacg_open_share_dialog({url, title});
  };

  return (
    <IconButton
      aria-label="share"
      onClick={handleClick}
      size="large"
      sx={{color: '#ffffff', pointerEvents: 'fill'}}
    >
      <ShareIcon />
    </IconButton>
  );
};

export default ShareButton;
