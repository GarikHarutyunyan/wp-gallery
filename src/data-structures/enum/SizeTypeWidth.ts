import {ISelectOption} from 'components/controls/SelectControl';

export enum SizeTypeWidth {
  PERCENT = '%',
  PIXEL = 'px',
  VW = 'vw',
  REM = 'rem',
  EM = 'em',
}

export const SizeTypeWidthOptions: ISelectOption[] = [
  {value: SizeTypeWidth.PERCENT, title: '%'},
  {value: SizeTypeWidth.PIXEL, title: 'px'},
  {value: SizeTypeWidth.VW, title: 'vw'},
  {value: SizeTypeWidth.REM, title: 'rem'},
  {value: SizeTypeWidth.EM, title: 'em'},
];
