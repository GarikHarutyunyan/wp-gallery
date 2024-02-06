import {IImageDTO} from 'data-structures';
import {useSettings} from '../settings';
import {ThumbnailGalleryWithDataFetching} from './ThumbnailGalleryWithDataFetching';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';
import {IGeneralSettings} from 'components/general-settings';

const images: IImageDTO[] = [
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Hats',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://images.unsplash.com/photo-1612144431180-2d672779556c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hbGwlMjBzaXplfGVufDB8fDB8fHww',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://images.unsplash.com/photo-1612144431180-2d672779556c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hbGwlMjBzaXplfGVufDB8fDB8fHww',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://images.unsplash.com/photo-1612144431180-2d672779556c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hbGwlMjBzaXplfGVufDB8fDB8fHww',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Sea star',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-icon-vector-illustration-260nw-489811306.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-icon-vector-illustration-260nw-489811306.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-icon-vector-illustration-260nw-489811306.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Basketball',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/image-vector/measuring-by-hands-width-size-260nw-1266046990.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/image-vector/measuring-by-hands-width-size-260nw-1266046990.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/image-vector/measuring-by-hands-width-size-260nw-1266046990.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Austro',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-small-scale-fit-260nw-1590167689.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-small-scale-fit-260nw-1590167689.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/image-vector/compact-size-small-scale-fit-260nw-1590167689.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Camera',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Coffee',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Fern',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Mushrooms',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Tomato basil',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Burger',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   original: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Bike',
  //   width: 500,
  //   height: 600,
  // },
];

const ThumbnailGalleryWithSettings = () => {
  const {
    generalSettings,
    thumbnailSettings,
  }: {
    thumbnailSettings?: IThumbnailSettings;
    generalSettings?: IGeneralSettings;
  } = useSettings();

  return generalSettings && thumbnailSettings ? (
    <ThumbnailGalleryWithDataFetching
      images={images}
      generalSettings={generalSettings as any}
      thumbnailSettings={thumbnailSettings as any}
    />
  ) : null;
};

export {ThumbnailGalleryWithSettings};
