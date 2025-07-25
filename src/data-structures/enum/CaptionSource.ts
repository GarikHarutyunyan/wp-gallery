export enum CaptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  PRICE = 'price',
  DESCRIPTION = 'description',
}

export const CaptionSourceOptions = [
  {value: CaptionSource.TITLE, title: 'Title'},
  {value: CaptionSource.CAPTION, title: 'Caption'},
  {value: CaptionSource.ALT, title: 'Alt'},
  {value: CaptionSource.PRICE, title: 'Price'},
  {value: CaptionSource.DESCRIPTION, title: 'Description'},
];
