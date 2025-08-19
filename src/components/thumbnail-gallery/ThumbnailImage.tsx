import {ImageListItem} from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import {
  CaptionSource,
  IImageDTO,
  ImageType,
  ThumbnailTitlePosition,
  TitleAlignment,
  TitleSource,
  TitleVisibility,
} from 'data-structures';
import {useMemo, useRef} from 'react';
import {createIcon} from 'yet-another-react-lightbox';

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

interface IThumbnailImageProps {
  image: IImageDTO;
  width: number;
  height: number;
  onClick?: () => void;
  getImageSource: (image: IImageDTO) => string;
  titleSource: TitleSource;
  titlePosition: ThumbnailTitlePosition;
  titleVisibility: TitleVisibility;
  titleAlignment?: TitleAlignment;
  titleFontFamily?: string;
  titleColor?: string;
  titleFontSize?: number | undefined;
  backgroundColor?: string;
  borderRadius?: number;
  margin?: number;
  hoverEffect?: string;
  showCaption: boolean;
  captionSource: CaptionSource;
  captionFontSize?: number | undefined;
  captionFontColor?: string;
}

const ThumbnailImage = ({
  image,
  width,
  height,
  onClick,
  getImageSource,
  titleSource,
  titlePosition,
  titleVisibility,
  titleAlignment,
  titleFontFamily,
  titleColor,
  titleFontSize,
  backgroundColor,
  borderRadius,
  margin,
  hoverEffect,
  showCaption,
  captionSource,
  captionFontSize,
  captionFontColor,
}: IThumbnailImageProps) => {
  const videoThumbnailIconSize = useMemo<string>(() => {
    const size: number = Math.min(width, height, 55) - 10;

    return size > 0 ? `${size}px` : '0px';
  }, [width, height]);

  const renderTitle = (image: IImageDTO) => {
    let paddingTitle = '0';

    if (
      titlePosition === ThumbnailTitlePosition.BELOW ||
      titlePosition === ThumbnailTitlePosition.ABOVE
    ) {
      paddingTitle = margin + 'px';
    } else if (titlePosition !== ThumbnailTitlePosition.CENTER) {
      paddingTitle = (borderRadius || 0) / 2 + '%';
    }

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'thumbnail-gallery__title_on-hover':
            titleVisibility === TitleVisibility.ON_HOVER &&
            titlePosition !== ThumbnailTitlePosition.BELOW &&
            titlePosition !== ThumbnailTitlePosition.ABOVE,
          'thumbnail-gallery__title_hidden':
            titleVisibility === TitleVisibility.NONE,
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
          }}
          className={clsx({
            'thumbnail-gallery__title-content_center':
              titlePosition === ThumbnailTitlePosition.CENTER,
          })}
          title={<span>{image[titleSource] || <br />}</span>}
          subtitle={
            showCaption && (
              <span className="thumbnail-image__caption">
                {image[captionSource] || <br />}
              </span>
            )
          }
          position={
            titlePosition === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : titlePosition === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : titlePosition
          }
        />
      </div>
    );
  };

  const wrapperRef = useRef(null);

  return (
    <div
      className={'reacg-thumbnails-item'}
      onClick={onClick}
      style={{
        overflow:
          titlePosition === ThumbnailTitlePosition.BELOW ||
          titlePosition === ThumbnailTitlePosition.ABOVE
            ? 'hidden'
            : 'unset',
        display:
          titlePosition === ThumbnailTitlePosition.ABOVE ? 'flex' : 'initial',
      }}
    >
      <ImageListItem
        key={image.thumbnail.url}
        style={{
          justifyContent:
            titlePosition === ThumbnailTitlePosition.ABOVE
              ? 'space-between'
              : 'initial',
        }}
      >
        {titlePosition === ThumbnailTitlePosition.ABOVE
          ? renderTitle(image)
          : null}
        <div
          style={{
            background: backgroundColor,
            borderRadius: borderRadius,
          }}
        >
          <div
            ref={wrapperRef}
            className={clsx(
              'thumbnail-gallery__image-wrapper',
              'thumbnail-gallery__image-wrapper_overflow',
              'thumbnail-gallery__image-wrapper_' + hoverEffect,
              {'thumbnail-gallery__image-wrapper_clickable': !!onClick}
            )}
            style={{
              width: width + 'px',
              height: height + 'px',
              margin: margin + 'px',
              borderRadius: borderRadius + '%',
            }}
          >
            <ReImage
              wrapperRef={wrapperRef}
              className={clsx(
                'thumbnail-gallery__image',
                'MuiImageListItem-img'
              )}
              src={getImageSource(image)}
              alt={image.alt}
              loading="eager"
              style={{
                width: width + 'px',
                height: height + 'px',
              }}
            />
            {image.type === ImageType.VIDEO && (
              <VideoThumbnailIcon
                style={{
                  height: videoThumbnailIconSize,
                  width: videoThumbnailIconSize,
                }}
                className={clsx('yarl__thumbnails_thumbnail_icon', {
                  'thumbnail-gallery__video-icon': !!onClick,
                })}
              />
            )}
            {titlePosition !== ThumbnailTitlePosition.BELOW &&
            titlePosition !== ThumbnailTitlePosition.ABOVE
              ? renderTitle(image)
              : null}
          </div>
        </div>
        {titlePosition === ThumbnailTitlePosition.BELOW
          ? renderTitle(image)
          : null}
      </ImageListItem>
    </div>
  );
};

export default ThumbnailImage;
