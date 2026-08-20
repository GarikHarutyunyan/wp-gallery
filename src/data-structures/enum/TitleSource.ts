export enum TitleSource {
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

export const TitleSourceOptions = [
  {value: TitleSource.TITLE, title: 'Item Title'},
  {value: TitleSource.CAPTION, title: 'Item Caption'},
  {value: TitleSource.ALT, title: 'Item Alt'},
  {value: TitleSource.DESCRIPTION, title: 'Item Description'},
  {value: TitleSource.IMAGE_TITLE, title: 'Image Title'},
  {value: TitleSource.IMAGE_CAPTION, title: 'Image Caption'},
  {value: TitleSource.IMAGE_ALT, title: 'Image Alt'},
  {value: TitleSource.IMAGE_DESCRIPTION, title: 'Image Description'},
  {value: TitleSource.PRICE, title: 'Product Price', isPro: true},
  {value: TitleSource.AUTHOR, title: 'Author'},
  {value: TitleSource.DATECREATED, title: 'Date Created'},
  {value: TitleSource.EXIF, title: 'Image EXIF'},
];
