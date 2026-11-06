import {ISelectOption} from 'components/controls/SelectControl';

export enum LightboxOpeningAnimation {
  NONE = 'none',
  FADE_IN = 'fade-in',
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out',
  SLIDE_UP = 'slide-up',
  SLIDE_DOWN = 'slide-down',
  SLIDE_LEFT = 'slide-left',
  SLIDE_RIGHT = 'slide-right',
  FLIP = 'flip',
}

export const LightboxOpeningAnimationOptions: ISelectOption[] = [
  {value: LightboxOpeningAnimation.NONE, title: 'None'},
  {value: LightboxOpeningAnimation.FADE_IN, title: 'Fade In'},
  {value: LightboxOpeningAnimation.ZOOM_IN, title: 'Zoom In'},
  {value: LightboxOpeningAnimation.ZOOM_OUT, title: 'Zoom Out'},
  {value: LightboxOpeningAnimation.SLIDE_UP, title: 'Slide Up'},
  {value: LightboxOpeningAnimation.SLIDE_DOWN, title: 'Slide Down'},
  {value: LightboxOpeningAnimation.SLIDE_LEFT, title: 'Slide Left'},
  {value: LightboxOpeningAnimation.SLIDE_RIGHT, title: 'Slide Right'},
  {value: LightboxOpeningAnimation.FLIP, title: 'Flip'},
];

