import CloseIcon from '@mui/icons-material/Close';
import {Dialog, IconButton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Alert} from './Alert';
import './alert-dialog.css';
import {
  errorConfig,
  needHelpConfig,
  newHereConfig,
  premiumConfig,
} from './AlertDialog.constants';
import {AlertConfig} from './AlertDialog.types';

interface DialogData {
  isVisible: boolean;
  config: AlertConfig;
}

interface IAlertDialogProps {}

const defaultState: DialogData = {
  isVisible: false,
  config: premiumConfig,
};

const AlertDialog: React.FC<IAlertDialogProps> = () => {
  const [data, setData] = useState<DialogData>(defaultState);
  const {isVisible, config} = data;

  useEffect(() => {
    (window as any).reacg_open_premium_offer_dialog = (
      customConfig: AlertConfig
    ) => handleOpen({...premiumConfig, ...customConfig});
    (window as any).reacg_open_need_help_dialog = (customConfig: AlertConfig) =>
      handleOpen({...needHelpConfig, ...customConfig});
    (window as any).reacg_open_new_here_dialog = (customConfig: AlertConfig) =>
      handleOpen({...newHereConfig, ...customConfig});
    (window as any).reacg_open_error_dialog = (customConfig: AlertConfig) =>
      handleOpen({...errorConfig, ...customConfig});
  }, []);

  const handleOpen = (newConfig: AlertConfig) => {
    setData((prevState) => ({
      ...prevState,
      isVisible: true,
      config: newConfig,
    }));
  };

  const handleClose = () => {
    setData((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
    config.onClose?.();
  };

  return (
    <Dialog
      sx={{borderRadius: 4}}
      open={isVisible}
      onClose={handleClose}
      PaperProps={{sx: {borderRadius: 6}}}
    >
      <IconButton onClick={handleClose} className={'modal-close'}>
        <CloseIcon />
      </IconButton>
      <Alert config={config} />
    </Dialog>
  );
};

export default AlertDialog;
