import {ISelectOption} from 'components/controls/SelectControl';

export enum HoverEffect {
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out',
  SLIDE = 'slide',
  ROTATE = 'rotate',
  BLUR = 'blur',
  SCALE = 'scale',
  SEPIA = 'sepia',
  OVERLAY = 'overlay',
  OVERLAY_ICON = 'overlay-icon',
  FLASH = 'flash',
  SHINE = 'shine',
  CIRCLE = 'circle',
  NONE = 'none',
}

export const HoverEffectOptions: ISelectOption[] = [
  {value: HoverEffect.ZOOM_IN, title: 'Zoom in'},
  {value: HoverEffect.ZOOM_OUT, title: 'Zoom out'},
  {value: HoverEffect.SLIDE, title: 'Slide'},
  {value: HoverEffect.ROTATE, title: 'Rotate'},
  {value: HoverEffect.BLUR, title: 'Blur'},
  {value: HoverEffect.SCALE, title: 'Gray Scale'},
  {value: HoverEffect.SEPIA, title: 'Sepia'},
  {value: HoverEffect.OVERLAY, title: 'Overlay'},
  {value: HoverEffect.OVERLAY_ICON, title: 'Overlay Icon'},
  {value: HoverEffect.FLASH, title: 'Flash'},
  {value: HoverEffect.SHINE, title: 'Shine'},
  {value: HoverEffect.CIRCLE, title: 'Circle'},
  {value: HoverEffect.NONE, title: 'None'},
];
