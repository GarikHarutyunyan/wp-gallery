export enum LightboxImageAnimation {
  FADE = 'fade',
  BLUR = 'blur',
  SLIDEH = 'slideH',
  SLIDEV = 'slideV',
  ZOOM = 'zoom',
  FLIP = 'flip',
  ROTATE = 'rotate',
}

export const LightboxImageAnimationOptions = [
  {value: LightboxImageAnimation.FADE, title: 'Fade'},
  {value: LightboxImageAnimation.BLUR, title: 'Blur'},
  {value: LightboxImageAnimation.SLIDEH, title: 'Slide Horizontal'},
  {value: LightboxImageAnimation.SLIDEV, title: 'Slide Vertical'},
  {value: LightboxImageAnimation.ZOOM, title: 'Zoom'},
  {value: LightboxImageAnimation.FLIP, title: 'Flip'},
  {value: LightboxImageAnimation.ROTATE, title: 'Rotate'},
];
