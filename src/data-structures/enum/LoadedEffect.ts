import {ISelectOption} from 'components/controls/SelectControl';

export enum LoadedEffect {
  NONE = 'none',
  FADE_IN = 'fade-in',
  SLIDE_UP = 'slide-up',
  SLIDE_DOWN = 'slide-down',
  SLIDE_LEFT = 'slide-left',
  SLIDE_RIGHT = 'slide-right',
  SCALE_UP = 'scale-up',
  SWING_DOWN = 'swing-down',
  DROP = 'drop',
  FLY = 'fly',
  FLIP = 'flip',
}

export const LoadedEffectOptions: ISelectOption[] = [
  {value: LoadedEffect.NONE, title: 'None'},
  {value: LoadedEffect.FADE_IN, title: 'Fade In'},
  {value: LoadedEffect.SLIDE_UP, title: 'Slide Up'},
  {value: LoadedEffect.SLIDE_DOWN, title: 'Slide Down'},
  {value: LoadedEffect.SLIDE_LEFT, title: 'Slide Left'},
  {value: LoadedEffect.SLIDE_RIGHT, title: 'Slide Right'},
  {value: LoadedEffect.SCALE_UP, title: 'Scale Up'},
  {value: LoadedEffect.SWING_DOWN, title: 'Swing Down'},
  {value: LoadedEffect.DROP, title: 'Drop'},
  {value: LoadedEffect.FLY, title: 'Fly'},
  {value: LoadedEffect.FLIP, title: 'Flip'},
];

