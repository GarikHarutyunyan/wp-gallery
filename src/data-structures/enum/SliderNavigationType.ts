export enum SliderNavigationType {
  ANGLE = 'angle',
  ANGLE_DOUBLE = 'angle_double',
  BOLD = 'bold',
  CARET = 'caret',
  CIRCLE = 'circle',
  CUSTOM = 'custom',
  THINSTRAIGHTLEFT = 'thin_straight',
}

export const SliderNavigationTypeOptions = [
  {value: SliderNavigationType.ANGLE, title: 'Angle'},
  {value: SliderNavigationType.ANGLE_DOUBLE, title: 'Angle Double'},
  {value: SliderNavigationType.BOLD, title: 'Bold'},
  {value: SliderNavigationType.CARET, title: 'Caret'},
  {value: SliderNavigationType.CIRCLE, title: 'Circle'},
  {value: SliderNavigationType.THINSTRAIGHTLEFT, title: 'Thin Straight'},
];
