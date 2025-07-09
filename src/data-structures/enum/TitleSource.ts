export enum TitleSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
}

export const TitleSourceOptions = [
  {value: TitleSource.TITLE, title: 'Title'},
  {value: TitleSource.CAPTION, title: 'Caption'},
  {value: TitleSource.ALT, title: 'Alt'},
  {value: TitleSource.DESCRIPTION, title: 'Description'},
];
