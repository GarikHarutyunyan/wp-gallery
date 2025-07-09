export enum DescriptionSource {
  TITLE = 'title',
  CAPTION = 'caption',
  ALT = 'alt',
  DESCRIPTION = 'description',
}

export const DescriptionSourceOptions = [
  {value: DescriptionSource.TITLE, title: 'Title'},
  {value: DescriptionSource.CAPTION, title: 'Caption'},
  {value: DescriptionSource.ALT, title: 'Alt'},
  {value: DescriptionSource.DESCRIPTION, title: 'Description'},
];
