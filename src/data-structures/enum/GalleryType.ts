import {ISelectOption} from 'components/controls/SelectControl';

export enum GalleryType {
  THUMBNAILS = 'thumbnails',
  MOSAIC = 'mosaic',
  MASONRY = 'masonry',
  SLIDESHOW = 'slideshow',
  CUBE = 'cube',
  CAROUSEL = 'carousel',
}

export const GalleryTypeOptions: ISelectOption[] = [
  {value: GalleryType.THUMBNAILS, title: 'Thumbnails'},
  {value: GalleryType.MOSAIC, title: 'Mosaic'},
  {value: GalleryType.MASONRY, title: 'Masonry'},
  {value: GalleryType.SLIDESHOW, title: 'Slideshow'},
  {value: GalleryType.CUBE, title: 'Cube'},
  {value: GalleryType.CAROUSEL, title: 'Carousel'},
];
