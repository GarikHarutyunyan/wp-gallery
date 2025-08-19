export enum TitlePosition {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
}

export enum ThumbnailTitlePosition {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
  ABOVE = 'above',
  BELOW = 'below',
}

export const TitlePositionOptions = [
  {value: TitlePosition.TOP, title: 'Top'},
  {value: TitlePosition.CENTER, title: 'Center'},
  {value: TitlePosition.BOTTOM, title: 'Bottom'},
];

export const ThumbnailTitlePositionOptions = [
  {value: ThumbnailTitlePosition.TOP, title: 'Top'},
  {value: ThumbnailTitlePosition.CENTER, title: 'Center'},
  {value: ThumbnailTitlePosition.BOTTOM, title: 'Bottom'},
  {value: ThumbnailTitlePosition.ABOVE, title: 'Above'},
  {value: ThumbnailTitlePosition.BELOW, title: 'Below'},
];
