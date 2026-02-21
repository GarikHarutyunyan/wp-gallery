import {ImageListItem} from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
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
import {useRef} from 'react';
import {Watermark} from 'utils/renderWatermark';

interface IThumbnailImageProps {
  image: IImageDTO;
  width: number;
  height: number;
  onClick?: () => void;
  getImageSource: (image: IImageDTO) => string;
  itemBorder: number;
  itemBackgroundColor: string;
  itemBorderRadius: number;
  backgroundColor?: string;
  borderRadius?: number;
  margin?: number;
  hoverEffect?: string;
  showTitle: boolean;
  titleSource: TitleSource;
  captionVisibility: TitleVisibility;
  titlePosition: ThumbnailTitlePosition;
  titleVisibility: TitleVisibility;
  titleFontSize?: number | undefined;
  titleColor?: string;
  titleAlignment?: TitleAlignment;
  titleFontFamily?: string;
  overlayTextBackground: string;
  invertTextColor: boolean;
  showCaption: boolean;
  captionSource: CaptionSource;
  captionPosition: ThumbnailTitlePosition;
  captionFontSize?: number | undefined;
  captionFontColor?: string;
  showDescription: boolean;
  descriptionSource: DescriptionSource;
  descriptionPosition: DescriptionPosition;
  descriptionFontSize?: number | undefined;
  descriptionFontColor?: string | undefined;
  descriptionMaxRowsCount?: number | undefined;
  showVideoCover: boolean;
}

const ThumbnailImage = ({
  image,
  width,
  height,
  onClick,
  getImageSource,
  itemBorder,
  itemBackgroundColor,
  itemBorderRadius,
  backgroundColor,
  borderRadius,
  margin,
  hoverEffect,
  showTitle,
  titleSource,
  titleVisibility,
  titlePosition,
  titleFontSize,
  titleColor,
  titleAlignment,
  titleFontFamily,
  overlayTextBackground,
  invertTextColor,
  showCaption,
  captionSource,
  captionVisibility,
  captionPosition,
  captionFontSize,
  captionFontColor,
  showDescription,
  descriptionSource,
  descriptionPosition,
  descriptionFontSize,
  descriptionFontColor,
  descriptionMaxRowsCount,
  showVideoCover,
}: IThumbnailImageProps) => {
  if (overlayTextBackground === '') {
    overlayTextBackground = 'unset';
  }

  if (itemBorder) {
    width = width - 2 * itemBorder;
    height = height - 2 * itemBorder;
  }

  const renderTitle = (image: IImageDTO) => {
    let itemPaddingText = '0';
    let imagePaddingText = '0';
    if (
      titlePosition === ThumbnailTitlePosition.BELOW ||
      titlePosition === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (itemBorderRadius || 0) / 2 + '%';
      imagePaddingText = margin + 'px';
    } else if (titlePosition !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
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
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === 'unset' &&
            titlePosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === 'unset' &&
            titlePosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === 'unset' &&
            titlePosition === ThumbnailTitlePosition.CENTER,
        })}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
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
            paddingLeft: imagePaddingText,
            paddingRight: imagePaddingText,
            textAlign: titleAlignment,
            color: titleColor,
            backgroundColor:
              titlePosition !== ThumbnailTitlePosition.BELOW &&
              titlePosition !== ThumbnailTitlePosition.ABOVE
                ? overlayTextBackground
                : 'initial',
            mixBlendMode:
              invertTextColor &&
              titlePosition !== ThumbnailTitlePosition.BELOW &&
              titlePosition !== ThumbnailTitlePosition.ABOVE
                ? 'difference'
                : 'initial',
          }}
          className={`thumbnail-gallery__title-content_${titlePosition}`}
          title={<span>{image[titleSource] || <br />}</span>}
          subtitle={
            titlePosition === captionPosition &&
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
    let itemPaddingText = '0';
    let imagePaddingText = '0';
    if (
      captionPosition === ThumbnailTitlePosition.BELOW ||
      captionPosition === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (itemBorderRadius || 0) / 2 + '%';
      imagePaddingText = margin + 'px';
    } else if (captionPosition !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
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
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === 'unset' &&
            captionPosition === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === 'unset' &&
            captionPosition === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === 'unset' &&
            captionPosition === ThumbnailTitlePosition.CENTER,
        })}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
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
            paddingLeft: imagePaddingText,
            paddingRight: imagePaddingText,
            textAlign: titleAlignment,
            color: captionFontColor,
            backgroundColor:
              captionPosition !== ThumbnailTitlePosition.BELOW &&
              captionPosition !== ThumbnailTitlePosition.ABOVE
                ? overlayTextBackground
                : 'initial',
            mixBlendMode:
              invertTextColor &&
              captionPosition !== ThumbnailTitlePosition.BELOW &&
              captionPosition !== ThumbnailTitlePosition.ABOVE
                ? 'difference'
                : 'initial',
          }}
          className={`thumbnail-gallery__title-content_${captionPosition}`}
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
    const itemPaddingText = itemBorderRadius
      ? itemBorderRadius / 2 + '%'
      : (margin || 0) + 'px';

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
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
          textAlign: titleAlignment,
        }}
      >
        {image[descriptionSource]}
      </div>
    );
  };

  const wrapperRef = useRef(null);
  const settings: any = {
    width,
    height,
    itemBorder,
    itemBackgroundColor,
    itemBorderRadius,
    backgroundColor,
    borderRadius,
    margin,
    hoverEffect,
    showTitle,
    titleSource,
    captionVisibility,
    titlePosition,
    titleVisibility,
    titleFontSize,
    titleColor,
    titleAlignment,
    titleFontFamily,
    overlayTextBackground,
    invertTextColor,
    showCaption,
    captionSource,
    captionPosition,
    captionFontSize,
    captionFontColor,
    showDescription,
    descriptionSource,
    descriptionPosition,
    descriptionFontSize,
    descriptionFontColor,
    descriptionMaxRowsCount,
    showVideoCover,
  };

  return (
    <div
      className={clsx(
        'reacg-thumbnails-item',
        !!onClick
          ? 'thumbnail-gallery__image-wrapper_clickable'
          : 'thumbnail-gallery__image-wrapper_non_clickable'
      )}
      onClick={onClick}
      style={{
        padding: itemBorder + 'px',
        background: itemBackgroundColor,
        borderRadius: itemBorderRadius + '%',
        boxSizing: 'border-box',
        overflow:
          titlePosition === ThumbnailTitlePosition.BELOW ||
          titlePosition === ThumbnailTitlePosition.ABOVE ||
          captionPosition === ThumbnailTitlePosition.BELOW ||
          captionPosition === ThumbnailTitlePosition.ABOVE
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
        {showCaption &&
        (titlePosition != captionPosition || !showTitle) &&
        captionPosition === ThumbnailTitlePosition.ABOVE
          ? renderCaption(image)
          : null}
        {showDescription && descriptionPosition === DescriptionPosition.ABOVE
          ? renderDescription(image)
          : null}
        <div
          className="thumbnail-gallery__item-outline"
          style={{
            background: backgroundColor,
            borderRadius: borderRadius + '%',
          }}
        >
          <div
            ref={wrapperRef}
            className={clsx(
              'thumbnail-gallery__image-wrapper',
              'thumbnail-gallery__image-wrapper_overflow',
              'thumbnail-gallery__image-wrapper_' + hoverEffect
            )}
            style={{
              width: width + 'px',
              height: height + 'px',
              margin: margin + 'px',
              borderRadius: borderRadius + '%',
              boxSizing: 'border-box',
            }}
          >
            {image.type === ImageType.IMAGE && (
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
            )}
            {image.type === ImageType.VIDEO && (
              <ReVideo
                wrapperRef={wrapperRef}
                item={image}
                settings={settings}
                coverImageProps={{
                  className: clsx(
                    'thumbnail-gallery__image',
                    'MuiImageListItem-img'
                  ),
                  src: getImageSource(image),
                  alt: image.alt,
                  loading: 'eager',
                  style: {
                    width: width + 'px',
                    height: height + 'px',
                  },
                }}
              />
            )}
            <Watermark />
            {showTitle &&
              titlePosition !== ThumbnailTitlePosition.BELOW &&
              titlePosition !== ThumbnailTitlePosition.ABOVE &&
              renderTitle(image)}
            {showCaption &&
              (titlePosition != captionPosition || !showTitle) &&
              captionPosition !== ThumbnailTitlePosition.BELOW &&
              captionPosition !== ThumbnailTitlePosition.ABOVE &&
              renderCaption(image)}
          </div>
        </div>
        {showTitle && titlePosition === ThumbnailTitlePosition.BELOW
          ? renderTitle(image)
          : null}
        {showCaption &&
        (titlePosition != captionPosition || !showTitle) &&
        captionPosition === ThumbnailTitlePosition.BELOW
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
