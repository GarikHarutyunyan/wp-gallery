interface IImageUrl {
  url: string;
  width: number;
  height: number;
}
export interface IImageDTO {
  title: string;
  caption: string;
  description: string;
  width: number;
  height: number;
  original: IImageUrl;
  medium_large: IImageUrl;
  thumbnail: IImageUrl;
}
