import {ISelectOption} from 'components/controls';

export enum PaginationButtonShape {
  ROUNDED = 'rounded',
  CIRCULAR = 'circular',
}

export const PaginationButtonShapeOptions: ISelectOption[] = [
  {value: PaginationButtonShape.ROUNDED, title: 'Rounded'},
  {value: PaginationButtonShape.CIRCULAR, title: 'Circular'},
];
