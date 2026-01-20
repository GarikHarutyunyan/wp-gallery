export enum DescriptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
  PRICE = 'price',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
}

export const DescriptionSourceOptions = [
  {value: DescriptionSource.TITLE, title: 'Item Title'},
  {value: DescriptionSource.CAPTION, title: 'Item Caption'},
  {value: DescriptionSource.ALT, title: 'Item Alt'},
  {value: DescriptionSource.DESCRIPTION, title: 'Item Description'},
  {value: DescriptionSource.PRICE, title: 'Product Price', isPro: true},
  {value: DescriptionSource.AUTHOR, title: 'Author'},
  {value: DescriptionSource.DATECREATED, title: 'Date Created'},
  {value: DescriptionSource.EXIF, title: 'Image EXIF'},
];
