import CloseIcon from '@mui/icons-material/Close';
import {Dialog, IconButton} from '@mui/material';
import React from 'react';
import {PremiumOffer} from './PremiumOffer';

interface IPremiumOfferDialogProps {
  isVisible: boolean;
  onClose: any;
}

const PremiumOfferDialog: React.FC<IPremiumOfferDialogProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Dialog
      sx={{borderRadius: 4}}
      open={isVisible}
      onClose={onClose}
      PaperProps={{sx: {borderRadius: 6}}}
    >
      <IconButton onClick={onClose} className={'modal-close'}>
        <CloseIcon />
      </IconButton>
      <PremiumOffer />
    </Dialog>
  );
};

export default PremiumOfferDialog;
