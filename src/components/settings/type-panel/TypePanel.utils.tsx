import {GalleryType} from 'data-structures';
import {BlogImage} from './images/BlogImage';
import {CardsImage} from './images/CardsImage';
import {CarouselImage} from './images/CarouselImage';
import {CubeImage} from './images/CubeImage';
import {JustifiedImage} from './images/JustifiedImage';
import {MasonryImage} from './images/MasonryImage';
import {MosaicImage} from './images/MosaicImage';
import {SlideshowImage} from './images/SlideshowImage';
import {ThumbnailsImage} from './images/ThumbnailsImage';
export const GalleryTypeOptions = [
  {
    value: GalleryType.THUMBNAILS,
    title: 'Thumbnails',
    image: <ThumbnailsImage />,
  },
  {
    value: GalleryType.MOSAIC,
    title: 'Mosaic',
    image: <MosaicImage />,
  },
  {
    value: GalleryType.MASONRY,
    title: 'Masonry',
    image: <MasonryImage />,
  },
  {
    value: GalleryType.JUSTIFIED,
    title: 'Justified',
    image: <JustifiedImage />,
  },
  {
    value: GalleryType.SLIDESHOW,
    title: 'Slideshow',
    image: <SlideshowImage />,
  },
  {
    value: GalleryType.CUBE,
    title: 'Cube',
    image: <CubeImage />,
  },
  {
    value: GalleryType.CAROUSEL,
    title: 'Carousel',
    image: <CarouselImage />,
  },
  {
    value: GalleryType.CARDS,
    title: 'Cards',
    image: <CardsImage />,
  },
  {
    value: GalleryType.BLOG,
    title: 'Blog',
    image: <BlogImage />,
  },
];
