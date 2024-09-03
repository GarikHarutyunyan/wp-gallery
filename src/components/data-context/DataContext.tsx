import {Paper, Typography} from '@mui/material';
import axios from 'axios';
import {useAppInfo} from 'contexts/AppInfoContext';
import {TranslationsContext} from 'contexts/TranslationsContext';
import {
  GalleryType,
  IGeneralSettings,
  IImageDTO,
  ImageType,
  PaginationType,
} from 'data-structures';
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSettings} from '../settings';
import {DataFetcher} from '../thumbnail-gallery/DataFetcher';

const propsImages: IImageDTO[] = [
  {
    id: '1',
    title: 'Hats',
    type: ImageType.IMAGE,
    caption: 'Hats',
    description: 'description',
    original: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 200,
      height: 200,
    },
    large: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 1000,
      height: 1000,
    },
    width: 500,
    height: 600,
  },
  {
    id: '2',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 200,
      height: 200,
    },
    title: 'Sea star',
    width: 500,
    height: 600,
  },
  {
    id: '3',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 200,
      height: 200,
    },
    title: 'Basketball',
    width: 500,
    height: 600,
  },
  {
    id: '4',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 200,
      height: 200,
    },
    title: 'Austro',
    width: 500,
    height: 600,
  },
  {
    id: '5',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 200,
      height: 200,
    },
    title: 'Camera',
    width: 500,
    height: 600,
  },
  {
    caption: 'caption',
    description: 'description',
    id: '6',
    large: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 200,
      height: 200,
    },
    title: 'Coffee',
    width: 500,
    height: 600,
  },

  {
    caption: 'caption',
    description: 'description',
    id: '7',
    large: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 200,
      height: 200,
    },
    title: 'Mushrooms',
    width: 500,
    height: 600,
  },
  {
    caption: 'caption',
    description: 'description',
    id: '8',
    large: {
      url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
      width: 200,
      height: 200,
    },
    title: 'Tomato basil',
    width: 500,
    height: 600,
  },
  {
    caption: 'caption',
    description: 'description',
    id: '9',
    large: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 200,
      height: 200,
    },
    title: 'Burger',
    width: 500,
    height: 600,
  },
  {
    caption: 'caption',
    description: 'description',
    id: '10',
    large: {
      url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
      width: 200,
      height: 200,
    },
    title: 'Bike',
    width: 500,
    height: 600,
  },
  {
    id: '11',
    title: 'Hats',
    type: ImageType.IMAGE,
    caption: 'Hats',
    description: 'description',
    original: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 200,
      height: 200,
    },
    large: {
      url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
      width: 1000,
      height: 1000,
    },
    width: 500,
    height: 600,
  },
  {
    id: '12',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
      width: 200,
      height: 200,
    },
    title: 'Sea star',
    width: 500,
    height: 600,
  },
  {
    id: '13',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
      width: 200,
      height: 200,
    },
    title: 'Basketball',
    width: 500,
    height: 600,
  },
  {
    id: '14',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
      width: 200,
      height: 200,
    },
    title: 'Austro',
    width: 500,
    height: 600,
  },
  {
    id: '15',
    caption: 'caption',
    description: 'description',
    large: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
      width: 200,
      height: 200,
    },
    title: 'Camera',
    width: 500,
    height: 600,
  },
  {
    caption: 'caption',
    description: 'description',
    id: '16',
    large: {
      url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://cdn.shopify.com/s/files/1/0529/2670/9917/files/sizeguide_480x480.png?v=1652793667',
      width: 200,
      height: 200,
    },
    title: 'Coffee',
    width: 500,
    height: 600,
  },

  {
    caption: 'caption',
    description: 'description',
    id: '17',
    large: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 1000,
      height: 1000,
    },
    type: ImageType.IMAGE,
    original: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 1000,
      height: 1000,
    },
    medium_large: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 500,
      height: 500,
    },
    thumbnail: {
      url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
      width: 200,
      height: 200,
    },
    title: 'Mushrooms',
    width: 500,
    height: 600,
  },
  // {
  //   caption: 'caption',
  //   description: 'description',
  //   id: '18',
  //   large: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Tomato basil',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   caption: 'caption',
  //   description: 'description',
  //   id: '19',
  //   large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
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
  //   caption: 'caption',
  //   description: 'description',
  //   id: '20',
  //   large: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Bike',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   id: '21',
  //   title: 'Hats',
  //   type: ImageType.IMAGE,
  //   caption: 'Hats',
  //   description: 'description',
  //   original: {
  //     url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   large: {
  //     url: 'https://cdn.pixabay.com/photo/2023/03/31/14/22/leo-7890130_640.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   id: '22',
  //   caption: 'caption',
  //   description: 'description',
  //   large: {
  //     url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://e1.pxfuel.com/desktop-wallpaper/664/468/desktop-wallpaper-beautiful-world-best-pic-in-the-world-best-most-beautiful-places-on-earth.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Sea star',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   id: '23',
  //   caption: 'caption',
  //   description: 'description',
  //   large: {
  //     url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://img.freepik.com/free-photo/colorful-lion-with-rainbow-mane_1340-39384.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Basketball',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   id: '24',
  //   caption: 'caption',
  //   description: 'description',
  //   large: {
  //     url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://cdn2.nbcuni.com/NBCUniversal/styles/newsroom_stories_16_9_image_style/s3/2024-04/parisOlympics.jpg?VersionId=m4JkLkVY9Y8sx3biupo01Zj1QiYYs2N2&h=c71d0c67&itok=uL0VNx2s',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Austro',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   id: '25',
  //   caption: 'caption',
  //   description: 'description',
  //   large: {
  //     url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://cdn.vox-cdn.com/thumbor/3SBWek0jlifiMKlnZ9VBpXM-jnA=/0x0:4550x3032/1200x800/filters:focal(1911x1152:2639x1880)/cdn.vox-cdn.com/uploads/chorus_image/image/73347523/2152956409.0.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Camera',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   caption: 'caption',
  //   description: 'description',
  //   id: '26',
  //   large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
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
  //   caption: 'caption',
  //   description: 'description',
  //   id: '27',
  //   large: {
  //     url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/9AEA/production/_129285693_gettyimages-853983104.jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Mushrooms',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   caption: 'caption',
  //   description: 'description',
  //   id: '28',
  //   large: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Tomato basil',
  //   width: 500,
  //   height: 600,
  // },
  // {
  //   caption: 'caption',
  //   description: 'description',
  //   id: '29',
  //   large: {
  //     url: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/Image-Files-Blog-Vector.jpg',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
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
  //   caption: 'caption',
  //   description: 'description',
  //   id: '30',
  //   large: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   type: ImageType.IMAGE,
  //   original: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 1000,
  //     height: 1000,
  //   },
  //   medium_large: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 500,
  //     height: 500,
  //   },
  //   thumbnail: {
  //     url: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2023/07/cz22v16ox0019-rgb-1665437283-jpeg.webp',
  //     width: 200,
  //     height: 200,
  //   },
  //   title: 'Bike',
  //   width: 500,
  //   height: 600,
  // },
];

const DataContext = createContext<{
  images?: IImageDTO[];
  lightboxImages?: IImageDTO[];
  isLoading?: boolean;
  pagesCount?: number;
  onPageChange?: (_: any, page: number) => void;
  isFullyLoaded?: boolean;
  loadAllLightboxImages?: () => Promise<void>;
}>({});

const DataProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {
    type,
    generalSettings,
    thumbnailSettings,
    mosaicSettings,
    masonrySettings,
  } = useSettings();

  const paginationType: PaginationType = useMemo(() => {
    if (type === GalleryType.MOSAIC) {
      return mosaicSettings!.paginationType;
    }
    if (type === GalleryType.THUMBNAILS) {
      return thumbnailSettings!.paginationType;
    }
    if (type === GalleryType.MASONRY) {
      return masonrySettings!.paginationType;
    }

    return PaginationType.NONE;
  }, [type, mosaicSettings, thumbnailSettings, masonrySettings]);

  const {itemsPerPage = 1} = generalSettings as IGeneralSettings;
  const {galleryId, baseUrl, nonce} = useAppInfo();
  const {noDataText, setLoadMoreText, setNoDataText} =
    useContext(TranslationsContext);
  const [images, setImages] = useState<IImageDTO[]>([]);
  const [lightboxImages, setLightboxImages] = useState<
    IImageDTO[] | undefined
  >();
  const [imageCount, setImageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pagesCount: number =
    itemsPerPage > 0 ? Math.ceil(imageCount / itemsPerPage) : imageCount;
  const isFullyLoaded: boolean = currentPage >= pagesCount;

  useEffect(() => {
    const reloadData = setTimeout(() => {
      itemsPerPage > 0 && onReloadData();
    }, 500);

    return () => clearTimeout(reloadData);
  }, [itemsPerPage, paginationType]);

  const loadAllLightboxImages = async (): Promise<void> => {
    const newLightboxImages: IImageDTO[] = await (getAllData as Function)();

    setLightboxImages(newLightboxImages);
  };

  const getAllData = async (): Promise<IImageDTO[]> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      const imgData: any[] = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        id: data.id,
        type: data.type,
        original: data.original,
        width: data.width,
        height: data.height,
        large: data.large,
        medium_large: data.medium_large,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        caption: data.caption,
      }));

      return newImages;
    }
    return images;
  };

  const getData = async (page: number) => {
    if (isLoading) {
      return;
    }
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId + '/images'
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      const perPageQueryString: string =
        paginationType !== PaginationType.NONE
          ? `&per_page=${itemsPerPage}`
          : '';
      const queryString: string = perPageQueryString
        ? `${queryStringSeperator}page=${page}${perPageQueryString}`
        : '';
      const imgData: any[] = (
        await axios.get(`${fetchUrl}${queryString}`, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;
      const newImages: IImageDTO[] = imgData.map((data: any) => ({
        id: data.id,
        type: data.type,
        original: data.original,
        width: data.width,
        height: data.height,
        large: data.large,
        medium_large: data.medium_large,
        thumbnail: data.thumbnail,
        title: data.title,
        caption: data.caption,
        description: data.description,
      }));

      if (paginationType === PaginationType.SIMPLE) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
      setCurrentPage(page);
      setIsLoading(false);
    } else {
      setImages(propsImages);
      setIsLoading(false);
    }
  };

  const getItemsCount = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'gallery/' + galleryId
      : undefined;

    if (fetchUrl) {
      const imgData: any = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;
      const newImageCount: number = imgData?.images_count;
      const loadMoreText: string | undefined =
        (window as any).reacg_global?.text?.load_more || undefined;
      const noDataText: string | undefined =
        (window as any).reacg_global?.text?.no_data || undefined;

      loadMoreText && setLoadMoreText?.(loadMoreText);
      noDataText && setNoDataText?.(noDataText);
      setImageCount(newImageCount);
    } else {
      setImageCount(0);
    }
  };

  const onPageChange = async (
    _event?: any,
    newPage: number = currentPage + 1
  ): Promise<void> => {
    getData(newPage);
  };

  const onReloadData = async () => {
    setIsLoading(true);
    setImages([]);
    setLightboxImages([]);
    setCurrentPage(0);
    setImageCount(0);
    getData(1);
    getItemsCount();
  };

  const renderContentPlaceholder = (): ReactElement => {
    return (
      <Paper variant={'outlined'} className={'content-placeholder'}>
        <Typography gutterBottom variant="h6" component="div">
          {noDataText}
        </Typography>
      </Paper>
    );
  };

  return (
    <DataContext.Provider
      value={{
        images,
        lightboxImages,
        isLoading,
        pagesCount,
        onPageChange,
        isFullyLoaded,
        loadAllLightboxImages,
      }}
    >
      {images.length || isLoading ? children : renderContentPlaceholder()}
      <DataFetcher onClick={onReloadData} />
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
