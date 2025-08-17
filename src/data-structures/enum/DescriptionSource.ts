export enum DescriptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  PRICE = 'price',
  DESCRIPTION = 'description',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const DescriptionSourceOptions = [
  {value: DescriptionSource.TITLE, title: 'Title'},
  {value: DescriptionSource.CAPTION, title: 'Caption'},
  {value: DescriptionSource.ALT, title: 'Alt'},
  {value: DescriptionSource.PRICE, title: 'Price'},
  {value: DescriptionSource.DESCRIPTION, title: 'Description'},
  {value: DescriptionSource.AUTHOR, title: 'Author'},
  {value: DescriptionSource.DATECREATED, title: 'Date created'},
  {value: DescriptionSource.EXIF, title: 'EXIF'},
];
