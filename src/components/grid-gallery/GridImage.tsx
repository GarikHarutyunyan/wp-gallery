import {ImageListItem} from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import {ActionButton} from 'core-components/action-button';
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
import {
  getLargestSrcItem,
  getSrcSetString,
  ISrcSetItem,
} from 'utils/imageSrcSet';
import {Watermark} from 'utils/renderWatermark';

interface IGridImageProps {
  image: IImageDTO;
  width: number;
  height: number;
  onClick?: () => void;
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
  showButton: boolean;
  buttonText: string;
  buttonVisibility: TitleVisibility;
  buttonPosition: ThumbnailTitlePosition;
  buttonAlignment?: TitleAlignment;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonFontSize?: number;
  buttonBorderSize?: number;
  buttonBorderColor?: string;
  buttonBorderRadius?: number;
  buttonUrl?: string;
  openInNewTab?: boolean;
  showVideoCover: boolean;
}

const GridImage = ({
  image,
  width,
  height,
  onClick,
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
  buttonUrl,
  openInNewTab,
  showVideoCover,
}: IGridImageProps) => {
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

    const isInsideTitlePosition =
      titlePosition !== ThumbnailTitlePosition.BELOW &&
      titlePosition !== ThumbnailTitlePosition.ABOVE;
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
    const hasSharedButton = titlePosition === buttonPosition && showButton;
    const buttonOnHoverAtTitle =
      hasSharedButton &&
      buttonVisibility === TitleVisibility.ON_HOVER &&
      buttonPosition !== ThumbnailTitlePosition.ABOVE &&
      buttonPosition !== ThumbnailTitlePosition.BELOW;
    const hasAlwaysContentAtTitle =
      (showTitle && !titleOnHover) ||
      (hasSharedCaption && !captionOnHoverAtTitle) ||
      (hasSharedButton && !buttonOnHoverAtTitle);
    const titleContainerOnHover =
      !hasAlwaysContentAtTitle &&
      (titleOnHover || captionOnHoverAtTitle || buttonOnHoverAtTitle);

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'thumbnail-gallery__title_on-hover': titleContainerOnHover,
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
          title={
            <span className={clsx({'reacg-content_on-hover': titleOnHover})}>
              {image[titleSource] || <br />}
            </span>
          }
          subtitle={
            hasSharedCaption || hasSharedButton ? (
              <>
                {hasSharedCaption && showCaption && image[captionSource] && (
                  <span
                    className={clsx('thumbnail-image__caption', {
                      'reacg-content_on-hover': captionOnHoverAtTitle,
                    })}
                  >
                    {image[captionSource]}
                  </span>
                )}
                {hasSharedButton && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={buttonUrl}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment}
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

    const isInsideCaptionPosition =
      captionPosition !== ThumbnailTitlePosition.BELOW &&
      captionPosition !== ThumbnailTitlePosition.ABOVE;
    const hasCaptionText = showCaption && !!image[captionSource];
    const captionOnHover =
      hasCaptionText &&
      captionVisibility === TitleVisibility.ON_HOVER &&
      isInsideCaptionPosition;
    const hasSharedButton = captionPosition === buttonPosition && showButton;
    const buttonOnHoverAtCaption =
      hasSharedButton &&
      buttonVisibility === TitleVisibility.ON_HOVER &&
      buttonPosition !== ThumbnailTitlePosition.ABOVE &&
      buttonPosition !== ThumbnailTitlePosition.BELOW;
    const hasAlwaysContentAtCaption =
      (hasCaptionText && !captionOnHover) ||
      (hasSharedButton && !buttonOnHoverAtCaption);
    const captionContainerOnHover =
      !hasAlwaysContentAtCaption && (captionOnHover || buttonOnHoverAtCaption);

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'thumbnail-gallery__title_on-hover': captionContainerOnHover,
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
            '& .MuiImageListItemBar-title': {
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
          title={
            hasCaptionText || hasSharedButton ? (
              <>
                {hasCaptionText && (
                  <span
                    className={clsx('thumbnail-image__caption', {
                      'reacg-content_on-hover': captionOnHover,
                    })}
                  >
                    {image[captionSource]}
                  </span>
                )}
                {hasSharedButton && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={buttonUrl}
                      openInNewTab={openInNewTab}
                      text={buttonText}
                      alignment={buttonAlignment}
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

  const renderButton = (position: ThumbnailTitlePosition) => {
    let itemPaddingText = '0';
    let imagePaddingText = '0';
    if (
      position === ThumbnailTitlePosition.BELOW ||
      position === ThumbnailTitlePosition.ABOVE
    ) {
      itemPaddingText = (itemBorderRadius || 0) / 2 + '%';
      imagePaddingText = margin + 'px';
    } else if (position !== ThumbnailTitlePosition.CENTER) {
      imagePaddingText = (borderRadius || 0) / 2 + '%';
    }

    const isOutside =
      position === ThumbnailTitlePosition.ABOVE ||
      position === ThumbnailTitlePosition.BELOW;

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'reacg-action-button-container_on-hover':
            showButton && buttonVisibility === TitleVisibility.ON_HOVER,
          'thumbnail-gallery__title_hidden': !showButton,
          'thumbnail-gallery__item-outline': isOutside,
          'reacg-gallery__text-background-top-gradient':
            overlayTextBackground === 'unset' &&
            position === ThumbnailTitlePosition.TOP,
          'reacg-gallery__text-background-bottom-gradient':
            overlayTextBackground === 'unset' &&
            position === ThumbnailTitlePosition.BOTTOM,
          'reacg-gallery__text-background-center-gradient':
            overlayTextBackground === 'unset' &&
            position === ThumbnailTitlePosition.CENTER,
        })}
        style={{
          paddingLeft: itemPaddingText,
          paddingRight: itemPaddingText,
        }}
      >
        <ImageListItemBar
          sx={{
            '& .MuiImageListItemBar-title': {
              fontFamily: titleFontFamily,
              lineHeight: 'normal',
            },
          }}
          style={{
            paddingLeft: imagePaddingText,
            paddingRight: imagePaddingText,
            textAlign: buttonAlignment,
            backgroundColor:
              position !== ThumbnailTitlePosition.BELOW &&
              position !== ThumbnailTitlePosition.ABOVE
                ? overlayTextBackground
                : 'initial',
            mixBlendMode:
              invertTextColor &&
              position !== ThumbnailTitlePosition.BELOW &&
              position !== ThumbnailTitlePosition.ABOVE
                ? 'difference'
                : 'initial',
          }}
          className={`thumbnail-gallery__title-content_${position}`}
          title={
            <span className="reacg-action-button-wrap">
              <ActionButton
                url={buttonUrl}
                openInNewTab={openInNewTab}
                text={buttonText}
                alignment={buttonAlignment}
                backgroundColor={buttonColor}
                textColor={buttonTextColor}
                fontSize={buttonFontSize}
                borderSize={buttonBorderSize}
                borderColor={buttonBorderColor}
                borderRadius={buttonBorderRadius}
                isOnHover={
                  buttonVisibility === TitleVisibility.ON_HOVER &&
                  buttonPosition !== ThumbnailTitlePosition.ABOVE &&
                  buttonPosition !== ThumbnailTitlePosition.BELOW
                }
              />
            </span>
          }
          position={
            position === ThumbnailTitlePosition.CENTER
              ? 'bottom'
              : position === ThumbnailTitlePosition.ABOVE
              ? 'below'
              : position
          }
        />
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
    buttonUrl,
    openInNewTab,
    showVideoCover,
  };
  const imageRequestSize = Math.max(width, height);
  const srcSetString: string = getSrcSetString(image.sizes);
  const largestSrcItem: ISrcSetItem = getLargestSrcItem(image.sizes);

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
          captionPosition === ThumbnailTitlePosition.ABOVE ||
          buttonPosition === ThumbnailTitlePosition.BELOW ||
          buttonPosition === ThumbnailTitlePosition.ABOVE
            ? 'hidden'
            : 'unset',
      }}
    >
      <ImageListItem
        key={image.original.url}
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
        {showButton &&
        (titlePosition != buttonPosition || !showTitle) &&
        (captionPosition != buttonPosition || !showCaption) &&
        buttonPosition === ThumbnailTitlePosition.ABOVE
          ? renderButton(buttonPosition)
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
              'reacg-action-button-hover-parent',
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
                src={largestSrcItem.src}
                srcSet={srcSetString}
                sizes={`${imageRequestSize}px`}
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
                  src: largestSrcItem.src,
                  srcSet: srcSetString,
                  sizes: `${imageRequestSize}px`,
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
            {showButton &&
              (titlePosition != buttonPosition || !showTitle) &&
              (captionPosition != buttonPosition || !showCaption) &&
              buttonPosition !== ThumbnailTitlePosition.BELOW &&
              buttonPosition !== ThumbnailTitlePosition.ABOVE &&
              renderButton(buttonPosition)}
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
        {showButton &&
        (titlePosition != buttonPosition || !showTitle) &&
        (captionPosition != buttonPosition || !showCaption) &&
        buttonPosition === ThumbnailTitlePosition.BELOW
          ? renderButton(buttonPosition)
          : null}
        {showDescription && descriptionPosition === DescriptionPosition.BELOW
          ? renderDescription(image)
          : null}
      </ImageListItem>
    </div>
  );
};

export default GridImage;
