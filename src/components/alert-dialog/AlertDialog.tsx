import CloseIcon from '@mui/icons-material/Close';
import {Dialog, IconButton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Alert} from './Alert';
import './alert-dialog.css';
import {
  errorConfig,
  freeTrialConfig,
  getFreeTrialLayoutConfig,
  getProLayoutDialogConfig,
  needHelpConfig,
  newHereConfig,
  premiumConfig,
  specialOfferConfig,
} from './AlertDialog.constants';
import {AlertConfig} from './AlertDialog.types';

interface DialogData {
  isVisible: boolean;
  config: AlertConfig;
  onClose?: () => void;
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
    (window as any).reacg_open_pro_layout_dialog = (
      customConfig: AlertConfig
    ) => handleOpen({...getProLayoutDialogConfig, ...customConfig});
    (window as any).reacg_open_free_trial_offer_dialog = (
      customConfig: AlertConfig
    ) => handleOpen({...freeTrialConfig, ...customConfig});
    (window as any).reacg_open_free_trial_layout_dialog = (
      customConfig: AlertConfig
    ) => handleOpen({...getFreeTrialLayoutConfig, ...customConfig});
    (window as any).reacg_open_need_help_dialog = (customConfig: AlertConfig) =>
      handleOpen({...needHelpConfig, ...customConfig});
    (window as any).reacg_open_new_here_dialog = (customConfig: AlertConfig) =>
      handleOpen({...newHereConfig, ...customConfig});
    (window as any).reacg_open_error_dialog = (customConfig: AlertConfig) =>
      handleOpen({...errorConfig, ...customConfig});
    (window as any).reacg_open_special_offer_dialog = (
      customConfig: AlertConfig
    ) => handleOpen({...specialOfferConfig, ...customConfig});
  }, []);

  const handleOpen = (newConfig: AlertConfig) => {
    setData((prevState) => ({
      ...prevState,
      isVisible: true,
      config: newConfig,
      onClose: newConfig.onClose,
    }));
  };

  const handleClose = () => {
    const externalOnClose = data.onClose;

    setData((prevState) => ({
      ...prevState,
      isVisible: false,
    }));

    externalOnClose?.();
  };

  return (
    <Dialog
      sx={{borderRadius: '6px'}}
      open={isVisible}
      onClose={handleClose}
      PaperProps={{sx: {borderRadius: '6px'}}}
    >
      <IconButton onClick={handleClose} className={'modal-close'}>
        <CloseIcon />
      </IconButton>
      <Alert config={{...config, onClose: handleClose}} />
    </Dialog>
  );
};

export default AlertDialog;
