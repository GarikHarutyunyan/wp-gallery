import {ISelectOption} from 'components/controls/SelectControl';

export enum Direction {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export const DirectionOptions: ISelectOption[] = [
  {value: Direction.HORIZONTAL, title: 'Horizontal'},
  {value: Direction.VERTICAL, title: 'Vertical'},
];
