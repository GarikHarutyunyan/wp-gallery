import {ReactElement} from 'react';

export interface IImageSizeObject {
  url: string;
  width: number;
  height: number;
}

export enum ImageType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface IImageDTO {
  id: string;
  title: string;
  type: ImageType;
  caption: string;
  price: string;
  alt: string;
  description: string;
  author: string;
  date_created: string;
  exif: ReactElement;
  original: IImageSizeObject;
  sizes: IImageSizeObject[];
  action_url: string;
  item_url: string;
  checkout_url: string;
}
