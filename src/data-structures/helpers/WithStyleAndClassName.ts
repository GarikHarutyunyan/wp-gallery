import {CSSProperties, PropsWithChildren} from 'react';

export interface WithStyleAndClassName extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
}
