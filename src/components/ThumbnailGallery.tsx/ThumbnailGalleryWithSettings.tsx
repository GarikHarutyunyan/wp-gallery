import {IImageDTO} from 'data-structures';
import {useSettings} from '../../components/settings';
import {ThumbnailGalleryWithDataFetching} from './ThumbnailGalleryWithDataFetching';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';

const images: IImageDTO[] = [
  {
    original: {
      url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      width: 200,
      height: 200,
    },
    title: 'Hats',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      width: 200,
      height: 200,
    },
    title: 'Sea star',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      width: 200,
      height: 200,
    },
    title: 'Basketball',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://i.pinimg.com/564x/b5/e9/97/b5e997177c6bf2ee2c9e4e0812defa6d.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://i.pinimg.com/564x/b5/e9/97/b5e997177c6bf2ee2c9e4e0812defa6d.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://i.pinimg.com/564x/b5/e9/97/b5e997177c6bf2ee2c9e4e0812defa6d.jpg',
      width: 200,
      height: 200,
    },
    title: 'Austro',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://i.pinimg.com/564x/8d/e7/b2/8de7b2b5fd6830c21094edba3a6c6fc3.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://i.pinimg.com/564x/8d/e7/b2/8de7b2b5fd6830c21094edba3a6c6fc3.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://i.pinimg.com/564x/8d/e7/b2/8de7b2b5fd6830c21094edba3a6c6fc3.jpg',
      width: 200,
      height: 200,
    },
    title: 'Camera',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      width: 200,
      height: 200,
    },
    title: 'Coffee',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      width: 200,
      height: 200,
    },
    title: 'Fern',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      width: 200,
      height: 200,
    },
    title: 'Mushrooms',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      width: 200,
      height: 200,
    },
    title: 'Tomato basil',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://i.pinimg.com/564x/d6/8a/bf/d68abfa3722e79d0f791dbfcc540dc76.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://i.pinimg.com/564x/d6/8a/bf/d68abfa3722e79d0f791dbfcc540dc76.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://i.pinimg.com/564x/d6/8a/bf/d68abfa3722e79d0f791dbfcc540dc76.jpg',
      width: 200,
      height: 200,
    },
    title: 'Burger',
    width: 500,
    height: 600,
  },
  {
    original: {
      url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      width: 200,
      height: 200,
    },
    title: 'Bike',
    width: 500,
    height: 600,
  },
];

const ThumbnailGalleryWithSettings = () => {
  const settings: IThumbnailSettings | null = useSettings();

  return settings ? (
    <ThumbnailGalleryWithDataFetching images={images} settings={settings} />
  ) : null;
};

export {ThumbnailGalleryWithSettings};
