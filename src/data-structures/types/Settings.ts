import {
  BlogViewImagePosition,
  Direction,
  GalleryType,
  HoverEffect,
  ImageClickAction,
  LightboxCaptionsPosition,
  LightboxImageAnimation,
  LightboxThumbnailsPosition,
  PaginationButtonShape,
  PaginationType,
  SizeTypeHeight,
  SizeTypeWidth,
  TextsAlignment,
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
  containerPadding: number;
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
  containerPadding: number;
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
  isFullCoverImage: boolean;
}

export interface ILightboxSettings extends ISlideshowSettings {
  isFullscreen: boolean;
  areControlButtonsShown: boolean;
  canDownload: boolean;
  canZoom: boolean;
  isFullscreenAllowed: boolean;
}

export interface IGeneralSettings {
  orderBy: string;
  orderDirection: string;
  itemsPerPage: number | undefined;
  activeButtonColor: string;
  inactiveButtonColor: string;
  paginationButtonShape: PaginationButtonShape;
  loadMoreButtonColor: string;
  paginationTextColor: string;
  clickAction: ImageClickAction;
  openUrlInNewTab: boolean;
}

export interface ICubeSettings {
  width: number;
  height: number;
  backgroundColor: string;
  padding: number;
  isInfinite: boolean;
  autoplay: boolean;
  slideDuration: number;
  shadow: boolean;
}

export interface ICarouselSettings {
  width: number;
  height: number;
  backgroundColor: string;
  padding: number;
  autoplay: boolean;
  slideDuration: number;
  playAndPauseAllowed: boolean;
  scale: number;
  imagesCount: number;
  spaceBetween: number;
}

export interface ICardsSettings {
  width: number;
  height: number;
  perSlideOffset: number;
  navigationButton: boolean;
  playAndPauseAllowed: boolean;
  autoplay: boolean;
  slideDuration: number;
}

export interface IBlogSettings {
  imageWidth: number;
  imageHeight: number;
  spacing: number;
  backgroundColor: string;
  containerPadding: number;
  imageRadius: number;
  hoverEffect: HoverEffect;
  textVerticalAlignment: TextsAlignment;
  titleAlignment: TitleAlignment;
  titleColor: string;
  descriptionColor: string;
  titleFontSize: number;
  descriptionFontSize: number;
  buttonText: string;
  buttonAlignment: TitleAlignment;
  buttonColor: string;
  buttonTextColor: string;
  buttonFontSize: number;
  textFontFamily: string;
  imageHeightType: SizeTypeHeight;
  imageWidthType: SizeTypeWidth;
  showButton: boolean;
  openInNewTab: boolean;
  showTitle: boolean;
  showDescription: boolean;
  textHorizontalSpacing: number;
  textVerticalSpacing: number;
  paginationType: PaginationType;
  descriptionMaxRowsCount: number | undefined;
  imagePosition: BlogViewImagePosition;
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
  carousel: ICarouselSettings;
  cards: ICardsSettings;
  blog: IBlogSettings;
  template_id?: number | string;
  title?: string;
  css?: string;
}
