export enum Ratio {
  SQUARE = '1',
  LANDSCAPE = '1.33',
  CLASSIC = '1.5',
  WIDESCREEN = '1.77',
  LANDSCAPEPORTRAIT = '0.75',
  CLASSICPORTRAIT = '0.66',
  WIDESCREENPORTRAIT = '0.56',
}

export const RatioOptions = [
  {value: Ratio.SQUARE, title: 'Square (1:1)'},
  {value: Ratio.LANDSCAPE, title: 'Landscape (4:3)'},
  {value: Ratio.CLASSIC, title: 'Classic (3:2)'},
  {value: Ratio.WIDESCREEN, title: 'Widescreen (16:9)'},
  {value: Ratio.LANDSCAPEPORTRAIT, title: 'Landscape Portrait (3:4)'},
  {value: Ratio.CLASSICPORTRAIT, title: 'Classic Portrait (2:3)'},
  {value: Ratio.WIDESCREENPORTRAIT, title: 'Widescreen Portrait (9:16)'},
];
