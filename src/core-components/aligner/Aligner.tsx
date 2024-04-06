import {styled} from '@mui/material/styles';
import React from 'react';

export enum Align {
  START = 'start',
  END = 'end',
  SPACE_BETWEEN = 'space-between',
}

interface IAlignerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  align?: Align;
}

const Aligner = (props: React.PropsWithChildren<IAlignerProps>) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: props.align || Align.SPACE_BETWEEN,
      }}
      {...props}
    />
  );
};

export {Aligner};
