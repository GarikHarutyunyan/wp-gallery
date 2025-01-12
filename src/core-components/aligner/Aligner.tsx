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
  gap?: number;
}

const Aligner = ({
  style,
  align,
  gap,
  ...restProps
}: React.PropsWithChildren<IAlignerProps>) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: align || Align.SPACE_BETWEEN,
        gap: gap + 'px',
        ...style,
      }}
      {...restProps}
    />
  );
};

export {Aligner};
