import {ImageListItem} from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import {
  CaptionSource,
  DescriptionPosition,
  DescriptionSource,
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
  showTitle: boolean;
  titleSource: TitleSource;
  titlePosition: ThumbnailTitlePosition;
  captionPosition: ThumbnailTitlePosition;
  captionVisibility: TitleVisibility;
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
  showDescription: boolean;
  descriptionSource: DescriptionSource;
  descriptionPosition: DescriptionPosition;
  descriptionFontSize?: number | undefined;
  descriptionFontColor?: string | undefined;
  descriptionMaxRowsCount?: number | undefined;
}

const ThumbnailImage = ({
  image,
  width,
  height,
  onClick,
  getImageSource,
  showTitle,
  titleSource,
  titlePosition,
  captionPosition,
  captionVisibility,
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
  showDescription,
  descriptionSource,
  descriptionPosition,
  descriptionFontSize,
  descriptionFontColor,
  descriptionMaxRowsCount,
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
            showTitle &&
            titleVisibility === TitleVisibility.ON_HOVER &&
            titlePosition !== ThumbnailTitlePosition.BELOW &&
            titlePosition !== ThumbnailTitlePosition.ABOVE,
          'thumbnail-gallery__title_hidden': !showTitle,
          'thumbnail-gallery__item-outline':
            showTitle &&
            (titlePosition === ThumbnailTitlePosition.BELOW ||
              titlePosition === ThumbnailTitlePosition.ABOVE),
        })}
        style={{
          paddingLeft: paddingTitle,
          paddingRight: paddingTitle,
        }}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-subtitle': {
              fontSize: `${captionFontSize}px`,
              fontFamily: titleFontFamily,
              color: captionFontColor,
              lineHeight: 'normal',
            },
            '& .MuiImageListItemBar-title': {
              fontSize: `${titleFontSize}px`,
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
            },
          }}
          style={{
            textAlign: titleAlignment,
            color: titleColor,
          }}
          className={clsx({
            'thumbnail-gallery__title-content_center':
              titlePosition === ThumbnailTitlePosition.CENTER,
          })}
          title={<span>{image[titleSource] || <br />}</span>}
          subtitle={
            titlePosition === captionPosition &&
            titlePosition !== ThumbnailTitlePosition.ABOVE &&
            titlePosition !== ThumbnailTitlePosition.BELOW &&
            showCaption &&
            image[captionSource] && (
              <span className="thumbnail-image__caption">
                {image[captionSource]}
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

  const renderCaption = (image: IImageDTO) => {
    let paddingTitle = '0';

    if (
      captionPosition === ThumbnailTitlePosition.BELOW ||
      captionPosition === ThumbnailTitlePosition.ABOVE
    ) {
      paddingTitle = margin + 'px';
    } else if (captionPosition !== ThumbnailTitlePosition.CENTER) {
      paddingTitle = (borderRadius || 0) / 2 + '%';
    }

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'thumbnail-gallery__title_on-hover':
            showCaption &&
            captionVisibility === TitleVisibility.ON_HOVER &&
            captionPosition !== ThumbnailTitlePosition.BELOW &&
            captionPosition !== ThumbnailTitlePosition.ABOVE,
          'thumbnail-gallery__title_hidden': !showCaption,
          'thumbnail-gallery__item-outline':
            showCaption &&
            (captionPosition === ThumbnailTitlePosition.BELOW ||
              captionPosition === ThumbnailTitlePosition.ABOVE),
        })}
        style={{
          paddingLeft: paddingTitle,
          paddingRight: paddingTitle,
        }}
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
            color: captionFontColor,
          }}
          className={clsx({
            'thumbnail-gallery__title-content_center':
              captionPosition === ThumbnailTitlePosition.CENTER,
          })}
          subtitle={
            showCaption && (
              <span className="thumbnail-image__caption">
                {image[captionSource] || <br />}
              </span>
            )
          }
          position={
            captionPosition === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : captionPosition === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : captionPosition
          }
        />
      </div>
    );
  };

  const renderDescription = (image: IImageDTO) => {
    const paddingTitle = margin + 'px';

    return (
      <div
        className={clsx(
          'thumbnail-gallery__description',
          'thumbnail-gallery__item-outline'
        )}
        style={{
          WebkitLineClamp: descriptionMaxRowsCount,
          fontSize: descriptionFontSize,
          color: descriptionFontColor,
          fontFamily: titleFontFamily,
          lineHeight: 'normal',
          paddingLeft: paddingTitle,
          paddingRight: paddingTitle,
          textAlign: titleAlignment,
        }}
      >
        {image[descriptionSource]}
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
      }}
    >
      <ImageListItem
        key={image.thumbnail.url}
        style={{
          justifyContent:
            ((titlePosition === ThumbnailTitlePosition.ABOVE ||
              captionPosition === ThumbnailTitlePosition.ABOVE) &&
              (!showDescription ||
                descriptionPosition === DescriptionPosition.ABOVE)) ||
            ((titlePosition !== ThumbnailTitlePosition.ABOVE ||
              captionPosition !== ThumbnailTitlePosition.ABOVE) &&
              showDescription &&
              descriptionPosition === DescriptionPosition.ABOVE)
              ? 'end'
              : titlePosition === ThumbnailTitlePosition.ABOVE ||
                captionPosition === ThumbnailTitlePosition.ABOVE
              ? 'start'
              : 'initial',
          height:
            ((titlePosition === ThumbnailTitlePosition.ABOVE ||
              captionPosition === ThumbnailTitlePosition.ABOVE) &&
              (!showDescription ||
                descriptionPosition === DescriptionPosition.ABOVE)) ||
            ((titlePosition !== ThumbnailTitlePosition.ABOVE ||
              captionPosition !== ThumbnailTitlePosition.ABOVE) &&
              showDescription &&
              descriptionPosition === DescriptionPosition.ABOVE)
              ? '100%'
              : titlePosition === ThumbnailTitlePosition.ABOVE ||
                captionPosition === ThumbnailTitlePosition.ABOVE
              ? '100%'
              : 'initial',
        }}
      >
        {showTitle && titlePosition === ThumbnailTitlePosition.ABOVE
          ? renderTitle(image)
          : null}
        {showCaption && captionPosition === ThumbnailTitlePosition.ABOVE
          ? renderCaption(image)
          : null}
        {showDescription && descriptionPosition === DescriptionPosition.ABOVE
          ? renderDescription(image)
          : null}
        <div
          className="thumbnail-gallery__item-outline"
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
              titlePosition !== ThumbnailTitlePosition.ABOVE &&
              renderTitle(image)}
            {titlePosition != captionPosition &&
              captionPosition !== ThumbnailTitlePosition.BELOW &&
              captionPosition !== ThumbnailTitlePosition.ABOVE &&
              renderCaption(image)}
          </div>
        </div>
        {showTitle && titlePosition === ThumbnailTitlePosition.BELOW
          ? renderTitle(image)
          : null}
        {showCaption && captionPosition === ThumbnailTitlePosition.BELOW
          ? renderCaption(image)
          : null}
        {showDescription && descriptionPosition === DescriptionPosition.BELOW
          ? renderDescription(image)
          : null}
      </ImageListItem>
    </div>
  );
};

export default ThumbnailImage;
