import React from 'react';
import {ThumbnailGallery} from './ThumbnailGallery';
import {IImageDTO} from 'data-structures';
import {useSettings} from '../../components/settings';
import {ThumbnailGalleryWithDataFetching} from './ThumbnailGalleryWithDataFetching';
import {IThumbnailSettings} from 'components/settings/ThumbnailSettings';

const images: IImageDTO[] = [
  {
    uri: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    uri: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    uri: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    uri: 'https://i.pinimg.com/564x/b5/e9/97/b5e997177c6bf2ee2c9e4e0812defa6d.jpg',
    title: 'Austro',
  },
  {
    uri: 'https://i.pinimg.com/564x/8d/e7/b2/8de7b2b5fd6830c21094edba3a6c6fc3.jpg',
    title: 'Camera',
  },
  {
    uri: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    uri: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    uri: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    uri: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    uri: 'https://i.pinimg.com/564x/d6/8a/bf/d68abfa3722e79d0f791dbfcc540dc76.jpg',
    title: 'Burger',
  },
  {
    uri: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

const ThumbnailGalleryWithSettings = () => {
  const settings: IThumbnailSettings | null = useSettings();

  return settings ? (
    <ThumbnailGalleryWithDataFetching images={images} settings={settings} />
  ) : null;
};

export {ThumbnailGalleryWithSettings};
