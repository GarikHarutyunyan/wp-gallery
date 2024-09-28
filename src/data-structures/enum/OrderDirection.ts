import {ISelectOption} from 'components/controls';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const OrderDirectionOptions: ISelectOption[] = [
  {value: OrderDirection.ASC, title: 'Ascending'},
  {value: OrderDirection.DESC, title: 'Descending'},
];
