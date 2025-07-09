export enum AspectRatioAction {
  ORIGINAL = 1,
  SQUARE = 1 / 1,
  LANDSCAPE = 4 / 3,
  PORTRAIT = 9 / 16,
  CLASSIC = 3 / 2,
  WIDE = 16 / 9,
  IMGPORTRAIT = 3 / 4,
}

export const AspectRatioOptions: any[] = [
  {value: AspectRatioAction.ORIGINAL, title: 'original'},
  {value: AspectRatioAction.SQUARE, title: 'Square - 1:1'},
  {value: AspectRatioAction.LANDSCAPE, title: 'Standard - 4:3'},
  {value: AspectRatioAction.SQUARE, title: 'Square - 1:1'},
  {value: AspectRatioAction.WIDE, title: 'Wide - 16:9'},
  {value: AspectRatioAction.PORTRAIT, title: 'Portrait - 3:4'},
  {value: AspectRatioAction.CLASSIC, title: 'Classic - 3:2'},
  {value: AspectRatioAction.PORTRAIT, title: 'Tall - 9:16'},
];
