import {LightboxThumbnailsPosition} from 'data-structures';

/**
 * Returns the CSS flexDirection for thumbnails layout
 */
export const getThumbnailsFlexDirection = (
  position: LightboxThumbnailsPosition
): 'row' | 'row-reverse' | 'column' | 'column-reverse' | undefined => {
  switch (position) {
    case LightboxThumbnailsPosition.START: // left side
      return 'row-reverse';
    case LightboxThumbnailsPosition.END: // right side
      return 'row';
    case LightboxThumbnailsPosition.BOTTOM: // top
      return 'column';
    case LightboxThumbnailsPosition.TOP: // bottom
      return 'column-reverse';
    case LightboxThumbnailsPosition.NONE: // no thumbs
    default:
      return undefined; // or null
  }
};

/**
 * Returns true if thumbnails are vertical (left/right)
 */
export const isThumbnailsVertical = (
  position: LightboxThumbnailsPosition
): boolean => {
  return (
    position === LightboxThumbnailsPosition.START ||
    position === LightboxThumbnailsPosition.END
  );
};

/**
 * Returns true if thumbnails are enabled at all
 */
export const hasThumbnails = (
  position: LightboxThumbnailsPosition
): boolean => {
  return position !== LightboxThumbnailsPosition.NONE;
};
