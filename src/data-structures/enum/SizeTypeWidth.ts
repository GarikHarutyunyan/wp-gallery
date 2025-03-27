import {ISelectOption} from 'components/controls/SelectControl';

export enum SizeTypeWidth {
  PC = '%',
  PX = 'px',
  VH = 'vh',
  VW = 'vw',
  REM = 'rem',
  EM = 'em',
}

export const SizeTypeWidthOptions: ISelectOption[] = [
  {value: SizeTypeWidth.PC, title: '%'},
  {value: SizeTypeWidth.PX, title: 'px'},
  {value: SizeTypeWidth.VH, title: 'vh'},
  {value: SizeTypeWidth.VW, title: 'vw'},
  {value: SizeTypeWidth.REM, title: 'rem'},
  {value: SizeTypeWidth.EM, title: 'em'},
];
