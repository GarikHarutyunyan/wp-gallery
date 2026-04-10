import { ISelectOption } from 'components/controls/SelectControl';

export enum TitleVisibility {
  ALWAYS_SHOWN = 'alwaysShown',
  ON_HOVER = 'onHover',
}

export const TitleVisibilityOptions: ISelectOption[] = [
  {value: TitleVisibility.ALWAYS_SHOWN, title: 'Always Show'},
  {value: TitleVisibility.ON_HOVER, title: 'Show on Hover'},
];
