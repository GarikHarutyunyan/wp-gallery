interface IImageUrl {
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
  width: number;
  height: number;
  original: IImageUrl;
  large: IImageUrl;
  medium_large: IImageUrl;
  thumbnail: IImageUrl;
  action_url: string;
}
