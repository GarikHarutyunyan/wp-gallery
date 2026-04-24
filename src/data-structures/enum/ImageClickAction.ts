import {ISelectOption} from 'components/controls';

export enum ImageClickAction {
  NONE = 'none',
  LIGHTBOX = 'lightbox',
  URL = 'url',
}

export const ImageClickActionOptions: ISelectOption[] = [
  {value: ImageClickAction.LIGHTBOX, title: 'Open Lightbox'},
  {value: ImageClickAction.URL, title: 'Open Link', isPro: true},
  {value: ImageClickAction.NONE, title: 'None'},
];
