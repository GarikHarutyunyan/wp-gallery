export enum SliderAnimation {
  FADE = 'fade',
  SLIDE = 'slide',
  FLIP = 'flip',
  ROTATE = 'rotate',
  ZOOM = 'zoom',
  //   ZOOM = 'zoom',
  CREATIVE = 'creative',
  //   ROTATE = 'rotate',
}

export const SliderAnimationOptions = [
  {value: SliderAnimation.FADE, title: 'Fade'},
  {value: SliderAnimation.FLIP, title: 'Flip'},
  {value: SliderAnimation.SLIDE, title: 'Slide'},
  {value: SliderAnimation.ROTATE, title: 'Rotate'},
  {value: SliderAnimation.ZOOM, title: 'Zoom'},
  //   {value: SliderAnimation.BLUR, title: 'Blur'},
  //   {value: SliderAnimation.SLIDEV, title: 'Slide Vertical'},
  //   {value: SliderAnimation.ZOOM, title: 'Zoom'},

  {value: SliderAnimation.CREATIVE, title: 'Creative'},
];
