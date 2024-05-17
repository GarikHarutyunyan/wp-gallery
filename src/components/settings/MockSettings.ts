import {IGeneralSettings} from 'components/general-settings';
import {ILightboxSettings} from 'components/light-box-settings';
import {IMosaicSettings} from 'components/mosaic-settings';
import {IThumbnailSettings} from 'components/thumbnail-settings';
import {
  Direction,
  HoverEffect,
  LightboxCaptionsPosition,
  LightboxImageAnimation,
  LightboxThumbnailsPosition,
  PaginationButtonShape,
  PaginationType,
  ThumbnailTitlePosition,
  TitleAlignment,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';

const thumbnailMockSettings: IThumbnailSettings = {
  width: 150,
  height: 150,
  columns: 5,
  gap: 10,
  backgroundColor: 'White',
  padding: 10,
  paddingColor: 'Skyblue',
  borderRadius: 5,
  titlePosition: ThumbnailTitlePosition.BOTTOM,
  titleAlignment: TitleAlignment.LEFT,
  titleVisibility: TitleVisibility.NONE,
  titleFontFamily: 'Roboto',
  titleColor: 'Black',
  titleFontSize: 20,
  hoverEffect: HoverEffect.BLUR,
};

const mosaicMockSettings: IMosaicSettings = {
  width: 70,
  direction: Direction.VERTICAL,
  gap: 5,
  backgroundColor: '',
  padding: 5,
  paddingColor: '',
  rowHeight: 250,
  columns: 5,
  borderRadius: 5,
  titlePosition: TitlePosition.BOTTOM,
  titleAlignment: TitleAlignment.LEFT,
  titleVisibility: TitleVisibility.NONE,
  titleFontFamily: 'Roboto',
  titleColor: 'Black',
  titleFontSize: 20,
};

const generalMockSettings: IGeneralSettings = {
  itemsPerPage: 8,
  paginationType: PaginationType.SCROLL,
  activeButtonColor: 'blue',
  inactiveButtonColor: 'inherit',
  paginationButtonShape: PaginationButtonShape.CIRCULAR,
  loadMoreButtonColor: 'blue',
  paginationTextColor: 'green',
};

const lightboxMockSettings: ILightboxSettings = {
  showLightbox: true,
  isFullscreen: false,
  width: 800,
  height: 800,
  areControlButtonsShown: false,
  isInfinite: false,
  padding: 15,
  canDownload: true,
  canZoom: true,
  isFullscreenAllowed: false,
  isSlideshowAllowed: false,
  autoplay: false,
  slideDuration: 3000,
  thumbnailsPosition: LightboxThumbnailsPosition.BOTTOM,
  thumbnailWidth: 80,
  thumbnailHeight: 80,
  thumbnailBorder: 2,
  thumbnailBorderRadius: 20,
  thumbnailBorderColor: 'white',
  thumbnailPadding: 0,
  thumbnailGap: 10,
  backgroundColor: '',
  captionsPosition: LightboxCaptionsPosition.BOTTOM,
  captionFontFamily: 'Roboto',
  captionColor: 'White',
  imageAnimation: LightboxImageAnimation.BLUR,
};

export {
  generalMockSettings,
  lightboxMockSettings,
  mosaicMockSettings,
  thumbnailMockSettings,
};
