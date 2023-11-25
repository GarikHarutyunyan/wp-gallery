import {ISelectOption} from 'components/controls';

export enum PaginationType {
  SIMPLE = 'simple',
  SCROLL = 'scroll',
  LOAD_MORE = 'loadMore',
  NONE = 'none',
}

export const PaginationTypeOptions: ISelectOption[] = [
  {value: PaginationType.SIMPLE, title: 'Simple'},
  {value: PaginationType.LOAD_MORE, title: 'Load More'},
  {value: PaginationType.SCROLL, title: 'Scroll'},
  {value: PaginationType.NONE, title: 'None'},
];
