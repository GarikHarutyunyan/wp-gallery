export enum DescriptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
  PRICE = 'price',
  AUTHOR = 'author',
  DATECREATED = 'date_created',
  EXIF = 'exif',
  IMAGE_TITLE = 'image_title',
  IMAGE_CAPTION = 'image_caption',
  IMAGE_ALT = 'image_alt',
  IMAGE_DESCRIPTION = 'image_description',
}

export const DescriptionSourceOptions = [
  {value: DescriptionSource.TITLE, title: 'Item Title'},
  {value: DescriptionSource.CAPTION, title: 'Item Caption'},
  {value: DescriptionSource.ALT, title: 'Item Alt'},
  {value: DescriptionSource.DESCRIPTION, title: 'Item Description'},
  {value: DescriptionSource.IMAGE_TITLE, title: 'Image Title'},
  {value: DescriptionSource.IMAGE_CAPTION, title: 'Image Caption'},
  {value: DescriptionSource.IMAGE_ALT, title: 'Image Alt'},
  {value: DescriptionSource.IMAGE_DESCRIPTION, title: 'Image Description'},
  {value: DescriptionSource.PRICE, title: 'Product Price', isPro: true},
  {value: DescriptionSource.AUTHOR, title: 'Author'},
  {value: DescriptionSource.DATECREATED, title: 'Date Created'},
  {value: DescriptionSource.EXIF, title: 'Image EXIF'},
];
