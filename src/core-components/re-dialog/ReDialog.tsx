import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import {ReactNode} from 'react';
import './re-dialog.css';

interface IReDialogAction {
  label: string;
  onClick: () => void;
}

interface IReDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  actions?: IReDialogAction[];
}

const ReDialog: React.FC<IReDialogProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box className={'re-dialog__title'}>
        <h1>{title}</h1>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {content ? (
        <DialogContent className={'re-dialog__content'}>
          {content}
        </DialogContent>
      ) : null}
      {actions?.map(({label, onClick}) => {
        return (
          <DialogActions>
            <Button onClick={onClick}>{label}</Button>
          </DialogActions>
        );
      })}
    </Dialog>
  );
};

export {ReDialog};
