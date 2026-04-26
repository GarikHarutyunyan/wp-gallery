import {IPositionOption} from 'components/controls';

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
  {value: Position.TOPLEFT, title: 'Top Left'},
  {value: Position.TOPCENTER, title: 'Top Center'},
  {value: Position.TOPRIGHT, title: 'Top Right'},
  {value: Position.MIDDLLEFT, title: 'Middle Left'},
  {value: Position.MIDDLECENTER, title: 'Middle Center'},
  {value: Position.MIDDLERIGHT, title: 'Middle Right'},
  {value: Position.BOTTOMLEFT, title: 'Bottom Left'},
  {value: Position.BOTTOMCENTER, title: 'Bottom Center'},
  {value: Position.BOTTOMRIGHT, title: 'Bottom Right'},
];
