import CloseIcon from '@mui/icons-material/Close';
import {Dialog, IconButton} from '@mui/material';
import React, {useEffect} from 'react';
import {ShareImageConfig} from './ShareDIalog.types';
import ShareImage from './ShareImage';
interface ShareDialogState {
  isOpen: boolean;
  url: string;
  title: string;
}

const ShareDialog: React.FC = () => {
  const [shareData, setShareData] = React.useState<ShareDialogState>({
    isOpen: false,
    url: '',
    title: '',
  });
  const {isOpen, url, title} = shareData;

  const openDialog = React.useCallback(({url, title}: ShareImageConfig) => {
    setShareData({isOpen: true, url, title});
  }, []);

  const closeDialog = () => {
    setShareData((prev) => ({...prev, isOpen: false}));
  };

  useEffect(() => {
    (window as any).reacg_open_share_dialog = (data: ShareImageConfig) =>
      openDialog(data);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      sx={{
        '& .MuiPaper-root': {
          m: '32px',
          width: 'auto',
          height: 'auto',
          maxHeight: 'none',
          borderRadius: '4px',
        },
      }}
    >
      <IconButton onClick={closeDialog} className={'modal-close'}>
        <CloseIcon />
      </IconButton>

      <ShareImage url={url} title={title} />
    </Dialog>
  );
};

export default ShareDialog;
