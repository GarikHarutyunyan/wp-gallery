import {ISelectOption} from 'components/controls';

export enum OrderBy {
  DEFAULT = 'default',
  TITLE = 'title',
  CAPTION = 'caption',
  DESCRIPTION = 'description',
  DATE = 'date',
}

export const OrderByOptions: ISelectOption[] = [
  {value: OrderBy.DEFAULT, title: 'Default'},
  {value: OrderBy.TITLE, title: 'Title'},
  {value: OrderBy.CAPTION, title: 'Caption'},
  {value: OrderBy.DESCRIPTION, title: 'Description'},
  {value: OrderBy.DATE, title: 'Date'},
];
