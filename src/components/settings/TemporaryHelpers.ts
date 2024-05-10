import {IGeneralSettings} from 'components/general-settings';
import {IThumbnailSettings} from 'components/thumbnail-settings';
import {HoverEffect} from 'data-structures';

const extractThumbnailSettings = (
  settings: IThumbnailSettings & IGeneralSettings
): IThumbnailSettings => {
  const {
    backgroundColor,
    borderRadius,
    columns = 1,
    gap,
    height = 1,
    padding,
    paddingColor,
    titleAlignment,
    titleColor,
    titleFontFamily,
    titleFontSize = 1,
    titlePosition,
    titleVisibility,
    width = 1,
    hoverEffect = HoverEffect.BLUR,
  }: IThumbnailSettings = settings;

  return {
    backgroundColor,
    borderRadius,
    columns,
    gap,
    height,
    padding,
    paddingColor,
    titleAlignment,
    titleColor,
    titleFontFamily,
    titleFontSize,
    titlePosition,
    titleVisibility,
    width,
    hoverEffect,
  };
};

const extractGeneralSettings = (
  settings: IThumbnailSettings & IGeneralSettings
): IGeneralSettings => {
  const {
    activeButtonColor,
    inactiveButtonColor,
    itemsPerPage = 1,
    loadMoreButtonColor,
    paginationButtonShape,
    paginationTextColor,
    paginationType,
  }: IGeneralSettings = settings;

  return {
    activeButtonColor,
    inactiveButtonColor,
    itemsPerPage,
    loadMoreButtonColor,
    paginationButtonShape,
    paginationTextColor,
    paginationType,
  };
};

export {extractGeneralSettings, extractThumbnailSettings};
