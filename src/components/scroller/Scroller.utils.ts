const BREAKPOINT_MOBILE = 480;
const BREAKPOINT_TABLET = 768;
const SCALE_MOBILE = 0.62;
const SCALE_TABLET = 0.8;
const SCALE_DESKTOP = 1;

export const getResponsiveScale = (width: number) => {
  if (width < BREAKPOINT_MOBILE) return SCALE_MOBILE;

  if (width < BREAKPOINT_TABLET) return SCALE_TABLET;

  return SCALE_DESKTOP;
};
