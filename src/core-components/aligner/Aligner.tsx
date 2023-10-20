import {styled} from '@mui/material/styles';
import React from 'react';

type IAlignerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Aligner = styled((props: React.PropsWithChildren<IAlignerProps>) => {
  return <div {...props}></div>;
})(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

export {Aligner};
