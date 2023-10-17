export enum TitleVisibility {
  ALWAYS_SHOWN = 'alwaysShown',
  ON_HOVER = 'onHover',
  NONE = 'none',
}

export const TitleVisibilityOptions = [
  {value: TitleVisibility.ALWAYS_SHOWN, title: 'Always'},
  {value: TitleVisibility.ON_HOVER, title: 'Hover'},
  {value: TitleVisibility.NONE, title: 'None'},
];
