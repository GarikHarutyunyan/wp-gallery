export enum TitleSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  PRICE = 'price',
  DESCRIPTION = 'description',
}

export const TitleSourceOptions = [
  {value: TitleSource.TITLE, title: 'Title'},
  {value: TitleSource.CAPTION, title: 'Caption'},
  {value: TitleSource.ALT, title: 'Alt'},
  {value: TitleSource.PRICE, title: 'Price'},
  {value: TitleSource.DESCRIPTION, title: 'Description'},
];
