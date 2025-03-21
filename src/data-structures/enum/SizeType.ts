import {ISelectOption} from 'components/controls/SelectControl';

export enum SizeType {
  PX = 'px',
  VH = 'vh',
  VW = 'vw',
  REM = 'rem',
  EM = 'em',
}

export const SizeTypeOptions: ISelectOption[] = [
  {value: SizeType.PX, title: 'px'},
  {value: SizeType.VH, title: 'vh'},
  {value: SizeType.VW, title: 'vw'},
  {value: SizeType.REM, title: 'rem'},
  {value: SizeType.EM, title: 'em'},
];
