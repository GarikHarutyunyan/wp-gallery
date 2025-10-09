export enum AspectRatio {
  SQUARE = '1',
  LANDSCAPE = '1.33',
  CLASSIC = '1.5',
  WIDESCREEN = '1.77',
  LANDSCAPEPORTRAIT = '0.75',
  CLASSICPORTRAIT = '0.66',
  WIDESCREENPORTRAIT = '0.56',
}

export const AspectRatioOptions = [
  {value: AspectRatio.SQUARE, title: 'Square (1:1)'},
  {value: AspectRatio.LANDSCAPE, title: 'Landscape (4:3)'},
  {value: AspectRatio.CLASSIC, title: 'Classic (3:2)'},
  {value: AspectRatio.WIDESCREEN, title: 'Widescreen (16:9)'},
  {value: AspectRatio.LANDSCAPEPORTRAIT, title: 'Landscape Portrait (3:4)'},
  {value: AspectRatio.CLASSICPORTRAIT, title: 'Classic Portrait (2:3)'},
  {value: AspectRatio.WIDESCREENPORTRAIT, title: 'Widescreen Portrait (9:16)'},
];
