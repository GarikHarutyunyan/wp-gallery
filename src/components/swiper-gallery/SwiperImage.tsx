import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import {ActionButton} from 'core-components/action-button';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {
  ActionURLSource,
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IImageDTO,
  ImageType,
  ThumbnailTitlePosition,
  TitleVisibility,
} from 'data-structures';
import {forwardRef, useRef} from 'react';
import {buildImageSrcSetString} from 'utils/imageSrcSet';
import {Watermark} from 'utils/renderWatermark';

interface ISwiperImageProps {
  galleryKey: string;
  image: IImageDTO;
  images: IImageDTO[];
  index: number;
  imagesCount: number;
  backgroundColor?: string;
  padding?: number;
  size?: number;
  settings: ICubeSettings | ICardsSettings | ICarouselSettings;
  titleCaptionHeight?: number;
}

const SwiperImage = forwardRef(
  (
    {
      image,
      images,
      index,
      imagesCount,
      backgroundColor,
      padding,
      size,
      galleryKey: key,
      settings,
      titleCaptionHeight,
    }: ISwiperImageProps,
    ref
  ) => {
    const {
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
      showVideoControls,
      showVideoCover,
    } = settings;
    const itemBorderRadius = 0;
    const borderRadius = 0;
    const margin = padding || 0;

    const wrapperRef = useRef(null);
    const shouldLoadImage =
      key === 'cardsEffect'
        ? index < (imagesCount || 0) + 1
        : index < (imagesCount || 0) / 2 + 1 ||
          index > images.length - (imagesCount || 0) / 2 - 1;

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
          className={clsx(
            'swiper-gallery__title swiper-gallery__title-caption',
            {
              'swiper-gallery__title_on-hover':
                showTitle &&
                titleVisibility === TitleVisibility.ON_HOVER &&
                titlePosition !== ThumbnailTitlePosition.BELOW &&
                titlePosition !== ThumbnailTitlePosition.ABOVE,
              'swiper-gallery__title_hidden': !showTitle,
              'swiper-gallery__item-outline':
                showTitle &&
                (titlePosition === ThumbnailTitlePosition.BELOW ||
                  titlePosition === ThumbnailTitlePosition.ABOVE),
              'reacg-gallery__text-background-top-gradient':
                overlayTextBackground === '' &&
                titlePosition === ThumbnailTitlePosition.TOP,
              'reacg-gallery__text-background-bottom-gradient':
                overlayTextBackground === '' &&
                titlePosition === ThumbnailTitlePosition.BOTTOM,
              'reacg-gallery__text-background-center-gradient':
                overlayTextBackground === '' &&
                titlePosition === ThumbnailTitlePosition.CENTER,
            }
          )}
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
              paddingLeft: '6px',
              paddingRight: '6px',
              textAlign: titleAlignment,
              color: titleColor,
              backgroundColor:
                overlayTextBackground === '' ? 'unset' : overlayTextBackground,
              mixBlendMode: invertTextColor ? 'difference' : 'initial',
            }}
            className={`swiper-gallery__title-content_${titlePosition}`}
            title={<span>{image[titleSource] || <br />}</span>}
            subtitle={
              <>
                {titlePosition === captionPosition && showCaption && (
                  <span className="thumbnail-image__caption">
                    {image[captionSource] || <br />}
                  </span>
                )}
                {titlePosition === buttonPosition && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
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
                )}
              </>
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
          className={clsx('swiper-gallery__title swiper-gallery__caption', {
            'swiper-gallery__title_on-hover':
              showCaption &&
              captionVisibility === TitleVisibility.ON_HOVER &&
              captionPosition !== ThumbnailTitlePosition.BELOW &&
              captionPosition !== ThumbnailTitlePosition.ABOVE,
            'swiper-gallery__title_hidden': !showCaption,
            'swiper-gallery__item-outline':
              showCaption &&
              (captionPosition === ThumbnailTitlePosition.BELOW ||
                captionPosition === ThumbnailTitlePosition.ABOVE),
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
              paddingLeft: '6px',
              paddingRight: '6px',
              textAlign: titleAlignment,
              color: captionFontColor,
              backgroundColor:
                overlayTextBackground === '' ? 'unset' : overlayTextBackground,
              mixBlendMode: invertTextColor ? 'difference' : 'initial',
            }}
            className={`swiper-gallery__title-content_${captionPosition}`}
            title={
              <>
                {showCaption && (
                  <span className="swiper-image__caption">
                    {image[captionSource] || <br />}
                  </span>
                )}
                {captionPosition === buttonPosition && showButton && (
                  <span className="reacg-action-button-wrap">
                    <ActionButton
                      url={image?.[buttonUrlSource as ActionURLSource] || ''}
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
                )}
              </>
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

    const renderButton = (
      position: ThumbnailTitlePosition,
      image: IImageDTO
    ) => {
      let itemPaddingText = '0';
      let imagePaddingText = '6px';
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
          className={clsx('swiper-gallery__title', 'swiper-gallery__button', {
            'reacg-action-button-container_on-hover':
              showButton && buttonVisibility === TitleVisibility.ON_HOVER,
            'swiper-gallery__item-outline': isOutside,
            'reacg-gallery__text-background-top-gradient':
              overlayTextBackground === '' &&
              position === ThumbnailTitlePosition.TOP,
            'reacg-gallery__text-background-bottom-gradient':
              overlayTextBackground === '' &&
              position === ThumbnailTitlePosition.BOTTOM,
            'reacg-gallery__text-background-center-gradient':
              overlayTextBackground === '' &&
              position === ThumbnailTitlePosition.CENTER,
          })}
          style={{
            paddingLeft: itemPaddingText,
            paddingRight: itemPaddingText,
          }}
        >
          <ImageListItemBar
            style={{
              paddingLeft: imagePaddingText,
              paddingRight: imagePaddingText,
              textAlign: buttonAlignment,
              backgroundColor:
                position !== ThumbnailTitlePosition.BELOW &&
                position !== ThumbnailTitlePosition.ABOVE
                  ? overlayTextBackground === ''
                    ? 'unset'
                    : overlayTextBackground
                  : 'initial',
              mixBlendMode:
                invertTextColor &&
                position !== ThumbnailTitlePosition.BELOW &&
                position !== ThumbnailTitlePosition.ABOVE
                  ? 'difference'
                  : 'initial',
            }}
            className={`swiper-gallery__title-content_${position}`}
            title={
              <span className="reacg-action-button-wrap">
                <ActionButton
                  url={image?.[buttonUrlSource as ActionURLSource] || ''}
                  openInNewTab={openInNewTab}
                  text={buttonText}
                  alignment={buttonAlignment}
                  backgroundColor={buttonColor}
                  textColor={buttonTextColor}
                  fontSize={buttonFontSize}
                  borderSize={buttonBorderSize}
                  borderColor={buttonBorderColor}
                  borderRadius={buttonBorderRadius}
                  isOnHover={!isOutside}
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

    return (
      <>
        {showTitle &&
          titlePosition === ThumbnailTitlePosition.ABOVE &&
          renderTitle(image)}
        {showCaption &&
          (titlePosition != captionPosition || !showTitle) &&
          captionPosition === ThumbnailTitlePosition.ABOVE &&
          renderCaption(image)}
        {showButton &&
          (titlePosition != buttonPosition || !showTitle) &&
          (captionPosition != buttonPosition || !showCaption) &&
          buttonPosition === ThumbnailTitlePosition.ABOVE &&
          renderButton(buttonPosition, image)}
        <div
          ref={wrapperRef}
          className={clsx(
            'swiper-gallery__image-wrapper',
            'reacg-action-button-hover-parent',
            'swiper-gallery__image-wrapper_overflow',
            'swiper-gallery__image-wrapper_' + hoverEffect
          )}
          style={{
            height: `calc(100% - ${titleCaptionHeight}px)`,
          }}
        >
          {image.type === ImageType.IMAGE && (
            <ReImage
              wrapperRef={wrapperRef}
              data-index={index}
              src={shouldLoadImage ? image.original.url : undefined}
              sizes={`${size}px`}
              srcSet={
                shouldLoadImage
                  ? buildImageSrcSetString(images[index])
                  : undefined
              }
              alt={image.alt}
            />
          )}
          {image.type === ImageType.VIDEO && (
            <ReVideo
              wrapperRef={wrapperRef}
              item={image}
              settings={settings}
              coverImageProps={{
                dataIndex: index,
                src: shouldLoadImage ? image.medium_large.url : undefined,
                srcSet: shouldLoadImage
                  ? buildImageSrcSetString(images[index], {includeOriginal: false})
                  : undefined,
                alt: image.alt,
                loading: 'eager',
                sizes: `${size}px`,
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
            renderButton(buttonPosition, image)}
        </div>
        {showTitle &&
          titlePosition === ThumbnailTitlePosition.BELOW &&
          renderTitle(image)}
        {showCaption &&
          (titlePosition != captionPosition || !showTitle) &&
          captionPosition === ThumbnailTitlePosition.BELOW &&
          renderCaption(image)}
        {showButton &&
          (titlePosition != buttonPosition || !showTitle) &&
          (captionPosition != buttonPosition || !showCaption) &&
          buttonPosition === ThumbnailTitlePosition.BELOW &&
          renderButton(buttonPosition, image)}
      </>
    );
  }
);

export default SwiperImage;
