export enum CaptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
  PRICE = 'price',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const CaptionSourceOptions = [
  {value: CaptionSource.TITLE, title: 'Item Title'},
  {value: CaptionSource.CAPTION, title: 'Item Caption'},
  {value: CaptionSource.ALT, title: 'Item Alt'},
  {value: CaptionSource.DESCRIPTION, title: 'Item Description'},
  {value: CaptionSource.PRICE, title: 'Product Price', isPro: true},
  {value: CaptionSource.AUTHOR, title: 'Author'},
  {value: CaptionSource.DATECREATED, title: 'Date Created'},
  {value: CaptionSource.EXIF, title: 'Image EXIF'},
];
