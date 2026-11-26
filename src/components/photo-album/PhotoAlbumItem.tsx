import {ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import {ActionButton} from 'core-components/action-button';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  ActionURLSource,
  DescriptionPosition,
  DescriptionSource,
  IImageDTO,
  IJustifiedSettings,
  IMasonrySettings,
  IMosaicSettings,
  ImageType,
  TitleAlignment,
  TitlePosition,
  ThumbnailTitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {CSSProperties, ReactNode, useRef} from 'react';
import {Watermark} from 'utils/renderWatermark';
import './photo-album.css';

interface IPhotoAlbumItemProps extends React.PropsWithChildren {
  image: IImageDTO;
  imageProps: any;
  width: number;
  height: number;
  onClick?: () => void;
  settings: IMasonrySettings | IMosaicSettings | IJustifiedSettings;
  style: CSSProperties;
}

const PhotoAlbumItem: React.FC<IPhotoAlbumItemProps> = ({
  image,
  imageProps,
  width,
  height,
  onClick,
  settings,
  style,
  children,
}) => {
  const {
    padding,
    paddingColor,
    borderRadius,
    titleSource,
    titleVisibility,
    captionVisibility,
    titleAlignment,
    titlePosition,
    captionPosition,
    titleColor,
    titleFontFamily,
    titleFontSize,
    titleMaxRowsCount,
    overlayTextBackground,
    invertTextColor,
    hoverEffect,
    loadedEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    captionMaxRowsCount,
    showTitle,
    showButton,
    buttonText,
    buttonVisibility,
    buttonPosition,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    buttonFontSize,
    buttonBorderSize,
    buttonBorderColor,
    buttonBorderRadius,
    buttonUrlSource,
    openInNewTab,
  } = settings;
  const showDescription =
    'showDescription' in settings ? settings.showDescription : false;
  const descriptionSource =
    'descriptionSource' in settings
      ? settings.descriptionSource
      : DescriptionSource.DESCRIPTION;
  const descriptionPosition =
    'descriptionPosition' in settings
      ? settings.descriptionPosition
      : DescriptionPosition.BELOW;
  const descriptionFontSize =
    'descriptionFontSize' in settings
      ? settings.descriptionFontSize
      : undefined;
  const descriptionFontColor =
    'descriptionFontColor' in settings ? settings.descriptionFontColor : '';
  const descriptionMaxRowsCount =
    'descriptionMaxRowsCount' in settings
      ? settings.descriptionMaxRowsCount
      : undefined;
  const imageBorderRadius =
    padding < borderRadius / 2 ? borderRadius - padding : borderRadius / 2;

  const isOutsidePosition = (pos: ThumbnailTitlePosition | TitlePosition) =>
    pos === ThumbnailTitlePosition.ABOVE ||
    pos === ThumbnailTitlePosition.BELOW;

  const getBarPosition = (pos: ThumbnailTitlePosition | TitlePosition) =>
    pos === ThumbnailTitlePosition.CENTER || pos === TitlePosition.CENTER
      ? 'bottom'
      : pos === ThumbnailTitlePosition.ABOVE
      ? 'below'
      : pos;

  const renderTitle = (image: IImageDTO): ReactNode => {
    const isOutside = isOutsidePosition(titlePosition);
    const paddingTitle =
      titlePosition !== ThumbnailTitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';
    const isInsideTitlePosition = !isOutside;
    const titleOnHover =
      showTitle &&
      titleVisibility === TitleVisibility.ON_HOVER &&
      isInsideTitlePosition;
    const hasSharedCaption =
      titlePosition === captionPosition &&
      showCaption &&
      !!image[captionSource];
    const captionOnHoverAtTitle =
      hasSharedCaption &&
      captionVisibility === TitleVisibility.ON_HOVER &&
      isInsideTitlePosition;
    const hasSharedButton =
      titlePosition === buttonPosition && showButton && isInsideTitlePosition;
    if (
      isOutside &&
      !image?.[titleSource] &&
      !hasSharedCaption &&
      !hasSharedButton
    ) {
      return null;
    }
    const buttonOnHoverAtTitle =
      hasSharedButton &&
      buttonVisibility === TitleVisibility.ON_HOVER &&
      !isOutsidePosition(buttonPosition);
    const hasAlwaysContentAtTitle =
      (showTitle && !titleOnHover) ||
      (hasSharedCaption && !captionOnHoverAtTitle) ||
      (hasSharedButton && !buttonOnHoverAtTitle);
    const titleContainerOnHover =
      !hasAlwaysContentAtTitle &&
      (titleOnHover || captionOnHoverAtTitle || buttonOnHoverAtTitle);

    return (
      <div
        className={clsx('photo-album-item__title', {
          'photo-album-item__title_on-hover': titleContainerOnHover,
          'photo-album-item__title_hidden': !showTitle,
          'photo-album-item__item-outline': showTitle && isOutside,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            titlePosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            titlePosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            titlePosition === ThumbnailTitlePosition.CENTER,
        })}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontSize: `${titleFontSize}px`,
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
              display: titleMaxRowsCount ? '-webkit-box !important' : 'block',
              WebkitLineClamp: titleMaxRowsCount,
              WebkitBoxOrient: titleMaxRowsCount ? 'vertical' : 'initial',
            },
            '& .MuiImageListItemBar-subtitle': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
            '& .photo-album-item__caption': {
              display:
                hasSharedCaption && captionMaxRowsCount
                  ? '-webkit-box !important'
                  : 'block',
              WebkitLineClamp: hasSharedCaption
                ? captionMaxRowsCount
                : undefined,
              WebkitBoxOrient:
                hasSharedCaption && captionMaxRowsCount
                  ? 'vertical'
                  : 'initial',
            },
          }}
          style={{
            textAlign: titleAlignment,
            paddingLeft: paddingTitle,
            paddingRight: paddingTitle,
            color: titleColor,
            backgroundColor: isOutside
              ? 'initial'
              : overlayTextBackground === ''
              ? 'unset'
              : overlayTextBackground,
            mixBlendMode:
              invertTextColor && !isOutside ? 'difference' : 'initial',
          }}
          className={`photo-album-item__title-content_${titlePosition}`}
          title={
            showTitle && (!isOutside || image?.[titleSource]) ? (
              <span className={clsx({'reacg-content_on-hover': titleOnHover})}>
                {image?.[titleSource] || <br />}
              </span>
            ) : null
          }
          subtitle={
            hasSharedCaption || hasSharedButton ? (
              <>
                {hasSharedCaption && (
                  <span
                    className={clsx('photo-album-item__caption', {
                      'reacg-content_on-hover': captionOnHoverAtTitle,
                    })}
                  >
                    {image[captionSource]}
                  </span>
                )}
                {hasSharedButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment as TitleAlignment}
                      backgroundColor={buttonColor}
                      textColor={buttonTextColor}
                      fontSize={buttonFontSize}
                      borderSize={buttonBorderSize}
                      borderColor={buttonBorderColor}
                      borderRadius={buttonBorderRadius}
                      isOnHover={buttonOnHoverAtTitle}
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={getBarPosition(titlePosition)}
        />
      </div>
    );
  };

  const renderCaption = (image: IImageDTO): ReactNode => {
    const isOutside = isOutsidePosition(captionPosition);
    const paddingTitle =
      captionPosition !== ThumbnailTitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';
    const isInsideCaptionPosition = !isOutside;
    const hasCaptionText = showCaption && !!image[captionSource];
    const captionOnHover =
      hasCaptionText &&
      captionVisibility === TitleVisibility.ON_HOVER &&
      isInsideCaptionPosition;
    const hasSharedButton =
      captionPosition === buttonPosition &&
      showButton &&
      isInsideCaptionPosition;
    if (isOutside && !hasCaptionText && !hasSharedButton) {
      return null;
    }
    const buttonOnHoverAtCaption =
      hasSharedButton &&
      buttonVisibility === TitleVisibility.ON_HOVER &&
      !isOutsidePosition(buttonPosition);
    const hasAlwaysContentAtCaption =
      (hasCaptionText && !captionOnHover) ||
      (hasSharedButton && !buttonOnHoverAtCaption);
    const captionContainerOnHover =
      !hasAlwaysContentAtCaption && (captionOnHover || buttonOnHoverAtCaption);

    return (
      <div
        className={clsx('photo-album-item__title', {
          'photo-album-item__title_on-hover': captionContainerOnHover,
          'photo-album-item__title_hidden': !showCaption,
          'photo-album-item__item-outline': showCaption && isOutside,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            captionPosition === ThumbnailTitlePosition.CENTER,
        })}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
            '& .photo-album-item__caption': {
              display: captionMaxRowsCount ? '-webkit-box !important' : 'block',
              WebkitLineClamp: captionMaxRowsCount,
              WebkitBoxOrient: captionMaxRowsCount ? 'vertical' : 'initial',
            },
            '& .MuiImageListItemBar-subtitle': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            paddingLeft: paddingTitle,
            paddingRight: paddingTitle,
            color: captionFontColor,
            backgroundColor: isOutside
              ? 'initial'
              : overlayTextBackground === ''
              ? 'unset'
              : overlayTextBackground,
            mixBlendMode:
              invertTextColor && !isOutside ? 'difference' : 'initial',
          }}
          className={`photo-album-item__title-content_${captionPosition}`}
          title={
            hasCaptionText || hasSharedButton ? (
              <>
                {hasCaptionText && (
                  <span
                    className={clsx('photo-album-item__caption', {
                      'reacg-content_on-hover': captionOnHover,
                    })}
                  >
                    {image[captionSource]}
                  </span>
                )}
                {hasSharedButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment as TitleAlignment}
                      backgroundColor={buttonColor}
                      textColor={buttonTextColor}
                      fontSize={buttonFontSize}
                      borderSize={buttonBorderSize}
                      borderColor={buttonBorderColor}
                      borderRadius={buttonBorderRadius}
                      isOnHover={buttonOnHoverAtCaption}
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={getBarPosition(captionPosition)}
        />
      </div>
    );
  };

  const wrapperRef = useRef(null);

  const renderButton = (image: IImageDTO): ReactNode => {
    const isOutside = isOutsidePosition(buttonPosition);
    const paddingTitle =
      buttonPosition !== ThumbnailTitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';

    return (
      <div
        className={clsx('photo-album-item__title', {
          'reacg-action-button-container_on-hover':
            showButton &&
            buttonVisibility === TitleVisibility.ON_HOVER &&
            !isOutside,
          'photo-album-item__title_hidden': !showButton,
          'photo-album-item__item-outline': isOutside,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            buttonPosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            buttonPosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            buttonPosition === ThumbnailTitlePosition.CENTER,
        })}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: buttonAlignment,
            paddingLeft: paddingTitle,
            paddingRight: paddingTitle,
            backgroundColor: isOutside
              ? 'initial'
              : overlayTextBackground === ''
              ? 'unset'
              : overlayTextBackground,
            mixBlendMode:
              invertTextColor && !isOutside ? 'difference' : 'initial',
          }}
          className={`photo-album-item__title-content_${buttonPosition}`}
          title={
            <span className="reacg-action-button-wrap">
              <ActionButton
                url={image?.[buttonUrlSource as ActionURLSource] || ''}
                openInNewTab={openInNewTab}
                text={buttonText}
                alignment={buttonAlignment as TitleAlignment}
                backgroundColor={buttonColor}
                textColor={buttonTextColor}
                fontSize={buttonFontSize}
                borderSize={buttonBorderSize}
                borderColor={buttonBorderColor}
                borderRadius={buttonBorderRadius}
                isOnHover={
                  buttonVisibility === TitleVisibility.ON_HOVER && !isOutside
                }
              />
            </span>
          }
          position={getBarPosition(buttonPosition)}
        />
      </div>
    );
  };

  const renderDescription = (image: IImageDTO): ReactNode => {
    const paddingText = imageBorderRadius / 2 + 'px';

    return (
      <div
        className={clsx(
          'photo-album-item__description',
          'photo-album-item__item-outline'
        )}
        style={{
          WebkitLineClamp: descriptionMaxRowsCount,
          fontSize: descriptionFontSize,
          color: descriptionFontColor,
          fontFamily: titleFontFamily,
          lineHeight: 'normal',
          paddingLeft: paddingText,
          paddingRight: paddingText,
          textAlign: titleAlignment,
        }}
      >
        {image[descriptionSource]}
      </div>
    );
  };

  const hasTitleText = showTitle && Boolean(image?.[titleSource]);
  const hasCaptionText = showCaption && Boolean(image?.[captionSource]);
  const hasDescriptionText =
    showDescription && Boolean(image?.[descriptionSource]);

  const hasContentAtOutsidePosition = (
    pos: ThumbnailTitlePosition,
    descPos: DescriptionPosition
  ) =>
    (showTitle &&
      titlePosition === pos &&
      (hasTitleText ||
        (captionPosition === pos && hasCaptionText) ||
        (buttonPosition === pos && showButton))) ||
    (showCaption &&
      captionPosition === pos &&
      (hasCaptionText || (buttonPosition === pos && showButton))) ||
    (showButton && buttonPosition === pos) ||
    (hasDescriptionText && descriptionPosition === descPos);

  const hasAboveContent = hasContentAtOutsidePosition(
    ThumbnailTitlePosition.ABOVE,
    DescriptionPosition.ABOVE
  );
  const hasBelowContent = hasContentAtOutsidePosition(
    ThumbnailTitlePosition.BELOW,
    DescriptionPosition.BELOW
  );

  const hasOutsideContent = hasAboveContent || hasBelowContent;

  return (
    <div
      className={clsx(
        !!onClick
          ? 'photo-album-item__image-wrapper_clickable'
          : 'photo-album-item__image-wrapper_non_clickable'
      )}
      style={{
        background: paddingColor,
        borderRadius: `${borderRadius}px`,
        ...style,
        ...(hasOutsideContent
          ? {
              aspectRatio: 'unset',
              display: 'flex',
              flexDirection: 'column',
            }
          : {}),
      }}
      onClick={onClick}
    >
      {showTitle && titlePosition === ThumbnailTitlePosition.ABOVE
        ? renderTitle(image)
        : null}
      {showCaption &&
      (titlePosition !== captionPosition || !showTitle) &&
      captionPosition === ThumbnailTitlePosition.ABOVE
        ? renderCaption(image)
        : null}
      {showDescription &&
      image[descriptionSource] &&
      descriptionPosition === DescriptionPosition.ABOVE
        ? renderDescription(image)
        : null}
      {showButton && buttonPosition === ThumbnailTitlePosition.ABOVE
        ? renderButton(image)
        : null}
      <div
        ref={wrapperRef}
        className={clsx(
          're-image__wrapper',
          'photo-album-item__image-wrapper',
          'reacg-action-button-hover-parent',
          'photo-album-item__image-wrapper_overflow',
          'photo-album-item__image-wrapper_' + hoverEffect
        )}
        style={{
          borderRadius: `${imageBorderRadius}px`,
          ...(hasOutsideContent
            ? {
                height: 'auto',
                ...(style?.aspectRatio ? {aspectRatio: style.aspectRatio} : {}),
              }
            : {}),
        }}
      >
        {image.type === ImageType.IMAGE && (
          <ReImage
            wrapperRef={wrapperRef}
            {...imageProps}
            originalWidth={image.original.width}
            originalHeight={image.original.height}
            cropPosition={image.crop_position}
            loadedEffect={loadedEffect}
            style={{
              width: '100%',
              height: hasOutsideContent ? 'auto' : '100%',
              ...(hasOutsideContent && style?.aspectRatio
                ? {aspectRatio: style.aspectRatio}
                : {}),
              display: 'block',
            }}
          />
        )}
        {image.type === ImageType.VIDEO && (
          <ReVideo
            wrapperRef={wrapperRef}
            item={image}
            settings={settings}
            coverImageProps={{
              ...imageProps,
              originalWidth: image.original.width,
              originalHeight: image.original.height,
              cropPosition: image.crop_position,
              loadedEffect: loadedEffect,
              style: {
                width: '100%',
                height: hasOutsideContent ? 'auto' : '100%',
                ...(hasOutsideContent && style?.aspectRatio
                  ? {aspectRatio: style.aspectRatio}
                  : {}),
                display: 'block',
              },
            }}
          />
        )}
        <Watermark />
        {showTitle && !isOutsidePosition(titlePosition) && renderTitle(image)}
        {showCaption &&
          (titlePosition !== captionPosition || !showTitle) &&
          !isOutsidePosition(captionPosition) &&
          renderCaption(image)}
        {showButton &&
          (titlePosition !== buttonPosition || !showTitle) &&
          (captionPosition !== buttonPosition || !showCaption) &&
          !isOutsidePosition(buttonPosition) &&
          renderButton(image)}
      </div>
      {showTitle && titlePosition === ThumbnailTitlePosition.BELOW
        ? renderTitle(image)
        : null}
      {showCaption &&
      (titlePosition !== captionPosition || !showTitle) &&
      captionPosition === ThumbnailTitlePosition.BELOW
        ? renderCaption(image)
        : null}
      {showDescription &&
      image[descriptionSource] &&
      descriptionPosition === DescriptionPosition.BELOW
        ? renderDescription(image)
        : null}
      {showButton && buttonPosition === ThumbnailTitlePosition.BELOW
        ? renderButton(image)
        : null}
    </div>
  );
};

export {PhotoAlbumItem};
