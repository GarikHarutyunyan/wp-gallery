import { IPositionOption } from 'components/controls';

export enum Position {
  TOPLEFT = 'top-left',
  TOPCENTER = 'top-center',
  TOPRIGHT = 'top-right',
  MIDDLLEFT = 'middle-left',
  MIDDLECENTER = 'middle-center',
  MIDDLERIGHT = 'middle-right',
  BOTTOMLEFT = 'bottom-left',
  BOTTOMCENTER = 'bottom-center',
  BOTTOMRIGHT = 'bottom-right',
}

export const PositionOptions: IPositionOption[] = [
  {value: Position.TOPLEFT, title: 'Top left'},
  {value: Position.TOPCENTER, title: 'Top Center'},
  {value: Position.TOPRIGHT, title: 'Top right'},
  {value: Position.MIDDLLEFT, title: 'Middle left'},
  {value: Position.MIDDLECENTER, title: 'Middle center'},
  {value: Position.MIDDLERIGHT, title: 'Middle right'},
  {value: Position.BOTTOMLEFT, title: 'Bottom left'},
  {value: Position.BOTTOMCENTER, title: 'Bottom center'},
  {value: Position.BOTTOMRIGHT, title: 'Bottom right'},
];
