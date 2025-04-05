import {ISelectOption} from 'components/controls/SelectControl';

export enum SizeTypeHeight {
  PIXEL = 'px',
  VH = 'vh',
  REM = 'rem',
  EM = 'em',
}

export const SizeTypeHeightOptions: ISelectOption[] = [
  {value: SizeTypeHeight.PIXEL, title: 'px'},
  {value: SizeTypeHeight.VH, title: 'vh'},
  {value: SizeTypeHeight.REM, title: 'rem'},
  {value: SizeTypeHeight.EM, title: 'em'},
];
