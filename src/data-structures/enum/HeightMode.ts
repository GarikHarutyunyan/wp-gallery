import {ISelectOption} from 'components/controls/SelectControl';

export enum HeightMode {
  FIXED = 'fixed',
  AUTO = 'auto',
  ASPECT_RATIO = 'aspectRatio',
}

export const HeightModeOptions: ISelectOption[] = [
  {value: HeightMode.FIXED, title: 'Fixed'},
  {value: HeightMode.AUTO, title: 'Auto height'},
  {value: HeightMode.ASPECT_RATIO, title: 'Aspect ratio'},
];

