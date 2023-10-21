import MuiTab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/core/styles';

const Tab = withStyles({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
})(MuiTab);

export {Tab};
