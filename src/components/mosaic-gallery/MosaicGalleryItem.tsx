import {ImageListItemBar} from '@mui/material';
import clsx from 'clsx';
import {IMosaicSettings} from 'components/mosaic-settings';
import {useSettings} from 'components/settings';
import {
  IImageDTO,
  ImageType,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {CSSProperties, ReactNode} from 'react';
import {createIcon} from 'yet-another-react-lightbox';

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

const getThumbnailIconSize = (width: number, height: number) => {
  const size: number = Math.min(width, height, 55) - 10;

  return size > 0 ? `${size}px` : '0px';
};

interface IMosaicGalleryItemProps extends React.PropsWithChildren {
  image: IImageDTO;
  width: number;
  height: number;
  onClick?: () => void;
  style: CSSProperties;
}

const MosaicGalleryItem: React.FC<IMosaicGalleryItemProps> = ({
  image,
  width,
  height,
  onClick,
  style,
  children,
}) => {
  const {mosaicSettings} = useSettings();
  const {
    paddingColor,
    borderRadius,
    titleVisibility,
    titleAlignment,
    titlePosition,
    titleColor,
    titleFontFamily,
    titleFontSize,
  } = mosaicSettings as IMosaicSettings;

  const renderTitle = (): ReactNode => {
    // let paddingTitle = '0';
    // if (titlePosition !== TitlePosition.CENTER) {
    //   paddingTitle = borderRadius / 2 + '%';
    // }

    return image ? (
      <div
        className={clsx('mosaic-gallery__title', {
          'mosaic-gallery__title_on-hover':
            titleVisibility === TitleVisibility.ON_HOVER,
          'mosaic-gallery__title_hidden':
            titleVisibility === TitleVisibility.NONE,
        })}
        key={image.original.url}
      >
        <ImageListItemBar
          style={{
            textAlign: titleAlignment,
            /*margin: titlePosition !== TitlePosition.BELOW ? padding + "px" : 0,*/
            // paddingLeft: paddingTitle,
            // paddingRight: paddingTitle,
          }}
          className={clsx({
            'mosaic-gallery__title-content_center':
              titlePosition === TitlePosition.CENTER,
          })}
          title={
            <span
              style={{
                color: titleColor,
                fontFamily: titleFontFamily,
                fontSize: `${titleFontSize}px`,
              }}
            >
              {image.title || <br />}
            </span>
          }
          position={
            titlePosition !== TitlePosition.CENTER ? titlePosition : 'bottom'
          }
        />
      </div>
    ) : null;
  };

  return (
    <div
      style={{
        background: paddingColor,
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      className={clsx('mosaic-gallery__image-wrapper', {
        'mosaic-gallery__image-wrapper_clickable': !!onClick,
      })}
      onClick={onClick}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: `${borderRadius}px`,
        }}
      >
        {children}
        {image.type === ImageType.VIDEO && (
          <VideoThumbnailIcon
            style={{
              height: getThumbnailIconSize(width, height),
              width: getThumbnailIconSize(width, height),
            }}
            className={clsx(
              'yarl__thumbnails_thumbnail_icon',
              'mosaic-gallery__video-icon'
            )}
          />
        )}
        {renderTitle()}
      </div>
    </div>
  );
};

export {MosaicGalleryItem};
