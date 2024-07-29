import {Grid} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import {CSSProperties} from 'react';

interface IFilterProps extends React.PropsWithChildren {
  isLoading?: boolean;
  style?: CSSProperties;
}

const Filter: React.FC<IFilterProps> = ({children, isLoading, style}) => {
  return (
    <Grid item xs={12} sm={8} lg={6} style={style}>
      {isLoading ? <Skeleton height={52} /> : children}
    </Grid>
  );
};

export {Filter};
