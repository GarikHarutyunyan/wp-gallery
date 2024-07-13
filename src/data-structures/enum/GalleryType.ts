import {ISelectOption} from 'components/controls/SelectControl';

export enum GalleryType {
  THUMBNAILS = 'thumbnails',
  MOSAIC = 'mosaic',
  MASONRY = 'masonry',
  SLIDESHOW = 'slideshow',
  CAROUSEL = 'carousel',
  CUBE = 'cube',
}

export const GalleryTypeOptions: ISelectOption[] = [
  {value: GalleryType.THUMBNAILS, title: 'Thumbnails'},
  {value: GalleryType.MOSAIC, title: 'Mosaic'},
  {value: GalleryType.MASONRY, title: 'Masonry'},
  {value: GalleryType.SLIDESHOW, title: 'Slideshow'},
  {value: GalleryType.CAROUSEL, title: 'Carousel'},
  {value: GalleryType.CUBE, title: 'Cube'},
];
