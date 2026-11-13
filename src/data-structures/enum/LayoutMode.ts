import {ISelectOption} from 'components/controls/SelectControl';

export enum LayoutMode {
  BOXED = 'boxed',
  FULLWIDTH = 'fullwidth',
  FULLSCREEN = 'fullscreen',
}

export const LayoutModeOptions: ISelectOption[] = [
  {value: LayoutMode.BOXED, title: 'Boxed'},
  {value: LayoutMode.FULLWIDTH, title: 'Full width'},
  {value: LayoutMode.FULLSCREEN, title: 'Full screen'},
];

