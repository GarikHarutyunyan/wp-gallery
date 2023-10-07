import {Grid} from '@mui/material';

const Filter: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Grid item xs={12} sm={8} lg={6}>
      {children}
    </Grid>
  );
};

export {Filter};
