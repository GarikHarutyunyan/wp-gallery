import {ISelectOption} from 'components/controls/SelectControl';

export enum SizeTypeHeight {
  PX = 'px',
  VH = 'vh',
  VW = 'vw',
  REM = 'rem',
  EM = 'em',
}

export const SizeTypeHeightOptions: ISelectOption[] = [
  {value: SizeTypeHeight.PX, title: 'px'},
  {value: SizeTypeHeight.VH, title: 'vh'},
  {value: SizeTypeHeight.VW, title: 'vw'},
  {value: SizeTypeHeight.REM, title: 'rem'},
  {value: SizeTypeHeight.EM, title: 'em'},
];
