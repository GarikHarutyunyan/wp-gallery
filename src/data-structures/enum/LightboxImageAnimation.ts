export enum LightboxImageAnimation {
  FADE = 'fade',
  BLUR = 'blur',
  SLIDE_HORIZONTAL = 'slide-horizontal',
  SLIDE_VERTICAL = 'slide-vertical',
  ZOOM = 'zoom',
  FLIP = 'flip',
  ROTATE = 'rotate',
}

export const LightboxImageAnimationOptions = [
  {value: LightboxImageAnimation.FADE, title: 'Fade'},
  {value: LightboxImageAnimation.BLUR, title: 'Blur'},
  {value: LightboxImageAnimation.SLIDE_HORIZONTAL, title: 'Slide Horizontal'},
  {value: LightboxImageAnimation.SLIDE_VERTICAL, title: 'Slide Vertical'},
  {value: LightboxImageAnimation.ZOOM, title: 'Zoom'},
  {value: LightboxImageAnimation.FLIP, title: 'Flip'},
  {value: LightboxImageAnimation.ROTATE, title: 'Rotate'},
];
