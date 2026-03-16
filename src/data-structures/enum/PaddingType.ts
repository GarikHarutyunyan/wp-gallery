import {ISelectOption} from 'components/controls/SelectControl';

export enum PaddingType {
  PIXEL = 'px',
  VH = 'vh',
  VW = 'vw',
  PERCENT = '%',
}

export const PaddingTypetOptions: ISelectOption[] = [
  {value: PaddingType.PIXEL, title: 'px'},
  {value: PaddingType.VH, title: 'vh'},
  {value: PaddingType.VW, title: 'vw'},
  {value: PaddingType.PERCENT, title: '%'},
];
