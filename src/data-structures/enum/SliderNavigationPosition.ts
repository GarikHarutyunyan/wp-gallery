import { ISelectOption } from 'components/controls/SelectControl';

export enum SliderNavigationPosition {
  INSIDE = 'inside',
  OUTSIDE = 'outside',
}

export const SliderNavigationPositionOptions: ISelectOption[] = [
  {value: SliderNavigationPosition.INSIDE, title: 'Inside'},
  {value: SliderNavigationPosition.OUTSIDE, title: 'Outside'},
];
