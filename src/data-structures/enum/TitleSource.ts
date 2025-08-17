export enum TitleSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  PRICE = 'price',
  DESCRIPTION = 'description',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const TitleSourceOptions = [
  {value: TitleSource.TITLE, title: 'Title'},
  {value: TitleSource.CAPTION, title: 'Caption'},
  {value: TitleSource.ALT, title: 'Alt'},
  {value: TitleSource.PRICE, title: 'Price'},
  {value: TitleSource.DESCRIPTION, title: 'Description'},
  {value: TitleSource.AUTHOR, title: 'Author'},
  {value: TitleSource.DATECREATED, title: 'Date created'},
  {value: TitleSource.EXIF, title: 'EXIF'},
];
