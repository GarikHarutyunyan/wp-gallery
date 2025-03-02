import {ISelectOption} from 'components/controls';

export enum ImageClickAction {
  NONE = 'none',
  LIGHTBOX = 'lightbox',
  URL = 'url',
}

export const ImageClickActionOptions: ISelectOption[] = [
  {value: ImageClickAction.NONE, title: 'None'},
  {value: ImageClickAction.LIGHTBOX, title: 'Open lightbox'},
  {value: ImageClickAction.URL, title: 'Action URL'},
];
