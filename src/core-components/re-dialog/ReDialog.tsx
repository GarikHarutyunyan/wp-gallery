import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface IReDialogAction {
  label: string;
  onClick: () => void;
}

interface IReDialogProps {
  open: boolean;
  onClose: () => void;
  content: string;
  actions?: IReDialogAction[];
}

const ReDialog: React.FC<IReDialogProps> = ({
  open,
  onClose,
  content,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {content ? (
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
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
