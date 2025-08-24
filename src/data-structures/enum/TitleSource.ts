export enum TitleSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
  PRICE = 'price',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const TitleSourceOptions = [
  {value: TitleSource.TITLE, title: 'Item Title'},
  {value: TitleSource.CAPTION, title: 'Item Caption'},
  {value: TitleSource.ALT, title: 'Item Alt'},
  {value: TitleSource.DESCRIPTION, title: 'Item Description'},
  {value: TitleSource.PRICE, title: 'Product Price'},
  {value: TitleSource.AUTHOR, title: 'Author'},
  {value: TitleSource.DATECREATED, title: 'Date Created'},
  {value: TitleSource.EXIF, title: 'Image EXIF'},
];
