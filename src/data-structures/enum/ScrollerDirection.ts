import {ISelectOption} from 'components/controls/SelectControl';

export enum ScrollerDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export const ScrollerDirectionOptions: ISelectOption[] = [
  {value: ScrollerDirection.LEFT, title: 'Left'},
  {value: ScrollerDirection.RIGHT, title: 'Right'},
];
