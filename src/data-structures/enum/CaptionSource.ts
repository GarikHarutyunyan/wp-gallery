export enum CaptionSource {
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

export const CaptionSourceOptions = [
  {value: CaptionSource.TITLE, title: 'Item Title'},
  {value: CaptionSource.CAPTION, title: 'Item Caption'},
  {value: CaptionSource.ALT, title: 'Item Alt'},
  {value: CaptionSource.DESCRIPTION, title: 'Item Description'},
  {value: CaptionSource.IMAGE_TITLE, title: 'Image Title'},
  {value: CaptionSource.IMAGE_CAPTION, title: 'Image Caption'},
  {value: CaptionSource.IMAGE_ALT, title: 'Image Alt'},
  {value: CaptionSource.IMAGE_DESCRIPTION, title: 'Image Description'},
  {value: CaptionSource.PRICE, title: 'Product Price', isPro: true},
  {value: CaptionSource.AUTHOR, title: 'Author'},
  {value: CaptionSource.DATECREATED, title: 'Date Created'},
  {value: CaptionSource.EXIF, title: 'Image EXIF'},
];
