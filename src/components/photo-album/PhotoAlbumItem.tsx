import {ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import {ActionButton} from 'core-components/action-button';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  ActionURLSource,
  IImageDTO,
  IMasonrySettings,
  ImageType,
  TitleAlignment,
  TitlePosition,
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
  settings: IMasonrySettings;
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
    overlayTextBackground,
    invertTextColor,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
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
  const imageBorderRadius =
    padding < borderRadius / 2 ? borderRadius - padding : borderRadius / 2;

  const renderTitle = (image: IImageDTO): ReactNode => {
    const paddingTitle =
      titlePosition !== TitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';

    return (
      <div
        className={clsx('photo-album-item__title', {
          'photo-album-item__title_on-hover':
            showTitle && titleVisibility === TitleVisibility.ON_HOVER,
          'photo-album-item__title_hidden': !showTitle,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' && titlePosition === TitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            titlePosition === TitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            titlePosition === TitlePosition.CENTER,
        })}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontSize: `${titleFontSize}px`,
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
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
            color: titleColor,
            backgroundColor:
              overlayTextBackground === '' ? 'unset' : overlayTextBackground,
            mixBlendMode: invertTextColor ? 'difference' : 'initial',
          }}
          className={`photo-album-item__title-content_${titlePosition}`}
          title={showTitle && <span>{image?.[titleSource] || <br />}</span>}
          subtitle={
            (titlePosition === captionPosition &&
              showCaption &&
              image[captionSource]) ||
            (titlePosition === buttonPosition && showButton) ? (
              <>
                {titlePosition === captionPosition &&
                  showCaption &&
                  image[captionSource] && (
                    <span className="photo-album-item__caption">
                      {image[captionSource]}
                    </span>
                  )}
                {titlePosition === buttonPosition && showButton && (
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
                      isOnHover={buttonVisibility === TitleVisibility.ON_HOVER}
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={
            titlePosition !== TitlePosition.CENTER ? titlePosition : 'bottom'
          }
        />
      </div>
    );
  };

  const renderCaption = (image: IImageDTO): ReactNode => {
    const paddingTitle =
      titlePosition !== TitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';

    return (
      <div
        className={clsx('photo-album-item__title', {
          'photo-album-item__title_on-hover':
            showCaption && captionVisibility === TitleVisibility.ON_HOVER,
          'photo-album-item__title_hidden': !showCaption,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            captionPosition === TitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            captionPosition === TitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            captionPosition === TitlePosition.CENTER,
        })}
      >
        <ImageListItemBar
          sx={{
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
            backgroundColor:
              overlayTextBackground === '' ? 'unset' : overlayTextBackground,
            mixBlendMode: invertTextColor ? 'difference' : 'initial',
          }}
          className={`photo-album-item__title-content_${captionPosition}`}
          title={
            (showCaption && image[captionSource]) ||
            (captionPosition === buttonPosition && showButton) ? (
              <>
                {showCaption && image[captionSource] && (
                  <span className="photo-album-item__caption">
                    {image[captionSource]}
                  </span>
                )}
                {captionPosition === buttonPosition && showButton && (
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
                      isOnHover={buttonVisibility === TitleVisibility.ON_HOVER}
                    />
                  </span>
                )}
              </>
            ) : null
          }
          position={
            captionPosition !== TitlePosition.CENTER
              ? captionPosition
              : 'bottom'
          }
        />
      </div>
    );
  };

  const wrapperRef = useRef(null);

  const renderButton = (image: IImageDTO): ReactNode => {
    const paddingTitle =
      buttonPosition !== TitlePosition.CENTER
        ? imageBorderRadius / 2 + 'px'
        : '0';

    return (
      <div
        className={clsx('photo-album-item__title', {
          'reacg-action-button-container_on-hover':
            showButton && buttonVisibility === TitleVisibility.ON_HOVER,
          'photo-album-item__title_hidden': !showButton,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === '' &&
            buttonPosition === TitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === '' &&
            buttonPosition === TitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === '' &&
            buttonPosition === TitlePosition.CENTER,
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
            backgroundColor:
              overlayTextBackground === '' ? 'unset' : overlayTextBackground,
            mixBlendMode: invertTextColor ? 'difference' : 'initial',
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
                isOnHover={buttonVisibility === TitleVisibility.ON_HOVER}
              />
            </span>
          }
          position={
            buttonPosition !== TitlePosition.CENTER ? buttonPosition : 'bottom'
          }
        />
      </div>
    );
  };

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
      }}
      onClick={onClick}
    >
      <div
        ref={wrapperRef}
        className={clsx(
          'photo-album-item__image-wrapper',
          'reacg-action-button-hover-parent',
          'photo-album-item__image-wrapper_overflow',
          'photo-album-item__image-wrapper_' + hoverEffect
        )}
        style={{
          borderRadius: `${imageBorderRadius}px`,
        }}
      >
        {image.type === ImageType.IMAGE && (
          <ReImage
            wrapperRef={wrapperRef}
            {...imageProps}
            style={{
              width: '100%',
              height: '100%',
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
              style: {
                width: '100%',
                height: '100%',
                display: 'block',
              },
            }}
          />
        )}
        <Watermark />
        {showTitle && renderTitle(image)}
        {showCaption &&
          (titlePosition != captionPosition || !showTitle) &&
          renderCaption(image)}
        {showButton &&
          (titlePosition != buttonPosition || !showTitle) &&
          (captionPosition != buttonPosition || !showCaption) &&
          renderButton(image)}
      </div>
    </div>
  );
};

export {PhotoAlbumItem};
