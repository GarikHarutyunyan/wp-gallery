export enum SliderPaginationType {
  DEFAULT = 'Default',
  DYNAMIC = 'dynamic',
  FRACTION = 'fraction',
  NUMBERS = 'number',
}

export const SliderPaginationTypeOptions = [
  {value: SliderPaginationType.DEFAULT, title: 'Default'},
  {value: SliderPaginationType.DYNAMIC, title: 'Dynamic'},
  {value: SliderPaginationType.FRACTION, title: 'Fraction'},
  {value: SliderPaginationType.NUMBERS, title: 'Number'},
];
