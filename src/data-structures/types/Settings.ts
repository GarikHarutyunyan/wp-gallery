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

export interface ILightboxSettings {
  showLightbox: boolean;
  isFullscreen: boolean;
  width: number;
  height: number;
  areControlButtonsShown: boolean;
  isInfinite: boolean;
  padding: number;
  canDownload: boolean;
  canZoom: boolean;
  isSlideshowAllowed: boolean;
  autoplay: boolean;
  slideDuration: number;
  imageAnimation: LightboxImageAnimation;
  isFullscreenAllowed: boolean;
  thumbnailsPosition: LightboxThumbnailsPosition;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailBorder: number;
  thumbnailBorderColor: string;
  thumbnailBorderRadius: number;
  thumbnailPadding: number;
  thumbnailGap: number;
  backgroundColor: string;
  captionsPosition: LightboxCaptionsPosition;
  captionFontFamily: string;
  captionColor: string;
}

export interface IGeneralSettings {
  itemsPerPage: number | undefined;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
}
