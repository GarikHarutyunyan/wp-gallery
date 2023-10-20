import {Grid} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

interface IFilterProps extends React.PropsWithChildren {
  isLoading?: boolean;
}

const Filter: React.FC<IFilterProps> = ({children, isLoading}) => {
  return (
    <Grid item xs={12} sm={8} lg={6}>
      {isLoading ? <Skeleton height={48} /> : children}
    </Grid>
  );
};

export {Filter};
