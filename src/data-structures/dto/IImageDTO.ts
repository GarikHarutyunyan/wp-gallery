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
  title: string;
  type: ImageType;
  caption: string;
  description: string;
  width: number;
  height: number;
  original: IImageUrl;
  medium_large: IImageUrl;
  thumbnail: IImageUrl;
}
