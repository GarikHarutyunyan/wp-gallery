import {
  Direction,
  GalleryType,
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

export interface IThumbnailSettings {
  width?: number | undefined;
  height?: number | undefined;
  columns?: number | undefined;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  borderRadius: number;
  titlePosition: ThumbnailTitlePosition;
  titleAlignment: TitleAlignment;
  titleVisibility: TitleVisibility;
  titleFontFamily: string;
  titleColor: string;
  titleFontSize?: number | undefined;
  hoverEffect: HoverEffect;
  paginationType: PaginationType;
}

export interface IMasonrySettings {
  width: number;
  gap: number;
  backgroundColor: string;
  padding: number;
  paddingColor: string;
  columns?: number | undefined;
  borderRadius: number;
  titlePosition: TitlePosition;
  titleAlignment: TitleAlignment;
  titleVisibility: TitleVisibility;
  titleFontFamily: string;
  titleColor: string;
  titleFontSize?: number | undefined;
  hoverEffect: HoverEffect;
  paginationType: PaginationType;
}

export interface IMosaicSettings extends IMasonrySettings {
  direction: Direction;
  rowHeight: number;
}

export interface ISlideshowSettings {
  width: number;
  height: number;
  padding: number;
  autoplay: boolean;
  isInfinite: boolean;
  slideDuration: number;
  imageAnimation: LightboxImageAnimation;
  backgroundColor: string;
  captionsPosition: LightboxCaptionsPosition;
  captionFontFamily: string;
  captionColor: string;
  thumbnailsPosition: LightboxThumbnailsPosition;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailBorder: number;
  thumbnailBorderColor: string;
  thumbnailBorderRadius: number;
  thumbnailPadding: number;
  thumbnailGap: number;
  isSlideshowAllowed: boolean;
}

export interface ILightboxSettings extends ISlideshowSettings {
  showLightbox: boolean;
  isFullscreen: boolean;
  areControlButtonsShown: boolean;
  canDownload: boolean;
  canZoom: boolean;
  isFullscreenAllowed: boolean;
}

export interface IGeneralSettings {
  itemsPerPage: number | undefined;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
}

export interface ICubeSettings {
  width: number;
  height: number;
  backgroundColor: string;
  loop: boolean;
  autoplay: boolean;
  delay: number;
  shadow: boolean;
}

export interface ISettingsDTO {
  type: GalleryType;
  general: IGeneralSettings;
  thumbnails: IThumbnailSettings;
  mosaic: IMosaicSettings;
  masonry: IMasonrySettings;
  slideshow: ISlideshowSettings;
  lightbox: ILightboxSettings;
  cube: ICubeSettings;
}
