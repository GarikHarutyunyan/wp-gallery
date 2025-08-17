export enum CaptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  PRICE = 'price',
  DESCRIPTION = 'description',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const CaptionSourceOptions = [
  {value: CaptionSource.TITLE, title: 'Title'},
  {value: CaptionSource.CAPTION, title: 'Caption'},
  {value: CaptionSource.ALT, title: 'Alt'},
  {value: CaptionSource.PRICE, title: 'Price'},
  {value: CaptionSource.DESCRIPTION, title: 'Description'},
  {value: CaptionSource.AUTHOR, title: 'Author'},
  {value: CaptionSource.DATECREATED, title: 'Date created'},
  {value: CaptionSource.EXIF, title: 'EXIF'},
];
