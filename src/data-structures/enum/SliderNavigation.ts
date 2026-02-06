import { ISelectOption } from 'components/controls/SelectControl';

export enum SliderNavigation {
  ARROWS_AND_DOTS = 'arrowsAndDots',
  ARROWS = 'arrows',
  DOTS = 'dots',
  NONE = 'none',
}

export const SliderNavigationOptions: ISelectOption[] = [
  {value: SliderNavigation.ARROWS_AND_DOTS, title: 'Arrows and Dots'},
  {value: SliderNavigation.ARROWS, title: 'Arrows'},
  {value: SliderNavigation.DOTS, title: 'Dots'},
  {value: SliderNavigation.NONE, title: 'None'},
];
