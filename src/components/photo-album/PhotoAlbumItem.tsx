import {ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  IImageDTO,
  IMasonrySettings,
  ImageType,
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
            titlePosition === captionPosition &&
            showCaption &&
            image[captionSource] && (
              <span className="photo-album-item__caption">
                {image[captionSource]}
              </span>
            )
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
          }}
          className={`photo-album-item__title-content_${captionPosition}`}
          subtitle={
            showCaption && (
              <span className="photo-album-item__caption">
                {image[captionSource] || <br />}
              </span>
            )
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
      </div>
    </div>
  );
};

export {PhotoAlbumItem};
