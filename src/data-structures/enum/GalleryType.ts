import {ISelectOption} from 'components/controls/SelectControl';

export enum GalleryType {
  THUMBNAILS = 'thumbnails',
  MOSAIC = 'mosaic',
  MASONRY = 'masonry',
}

export const GalleryTypeOptions: ISelectOption[] = [
  {value: GalleryType.THUMBNAILS, title: 'Thumbnails'},
  {value: GalleryType.MOSAIC, title: 'Mosaic'},
  {value: GalleryType.MASONRY, title: 'Masonry'},
];
