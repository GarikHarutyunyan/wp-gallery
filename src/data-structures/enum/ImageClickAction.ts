import {ISelectOption} from 'components/controls';

export enum ImageClickAction {
  NONE = 'none',
  LIGHTBOX = 'lightbox',
  URL = 'url',
}

export const ImageClickActionOptions: ISelectOption[] = [
  {value: ImageClickAction.LIGHTBOX, title: 'Open lightbox'},
  {value: ImageClickAction.URL, title: 'Open link', isPro: true},
  {value: ImageClickAction.NONE, title: 'None'},
];
