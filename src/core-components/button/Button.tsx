import MuiButton from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const Button = withStyles({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
})(MuiButton);

export {Button};
