import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import {
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IImageDTO,
  ImageType,
  ThumbnailTitlePosition,
  TitleVisibility,
} from 'data-structures';
import {forwardRef, useRef} from 'react';
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
    } = settings;
    const itemBorderRadius = 0;
    const borderRadius = 0;
    const margin = padding || 0;

    const wrapperRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVideo: boolean = image.type === ImageType.VIDEO;
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
              titlePosition === captionPosition &&
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
            subtitle={
              showCaption && (
                <span className="swiper-image__caption">
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

    return (
      <>
        {showTitle &&
          titlePosition === ThumbnailTitlePosition.ABOVE &&
          renderTitle(image)}
        {showCaption &&
          (titlePosition != captionPosition || !showTitle) &&
          captionPosition === ThumbnailTitlePosition.ABOVE &&
          renderCaption(image)}
        <div
          ref={wrapperRef}
          className={clsx(
            'swiper-gallery__image-wrapper',
            'swiper-gallery__image-wrapper_overflow',
            'swiper-gallery__image-wrapper_' + hoverEffect
          )}
          style={{
            height: `calc(100% - ${titleCaptionHeight}px)`,
          }}
        >
          {!isVideo ? (
            <ReImage
              wrapperRef={wrapperRef}
              data-index={index}
              src={shouldLoadImage ? image.original.url : undefined}
              sizes={`${size}px`}
              srcSet={
                shouldLoadImage
                  ? `${images[index].thumbnail.url} ${images[index].thumbnail.width}w, ${images[index].medium_large.url} ${images[index].medium_large.width}w, ${images[index].original.url} ${images[index].original.width}w`
                  : undefined
              }
              alt={image.alt}
            />
          ) : (
            <div
              style={{position: 'absolute', width: '100%', height: '100%'}}
              onClick={(e) => {
                const video = videoRef?.current;

                if (video) {
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              }}
            >
              <video
                ref={videoRef}
                src={image.original.url}
                poster={image.medium_large.url}
                className={'swiper-gallery__video'}
                controls
                muted
                playsInline
                loop
                preload="auto"
              />
            </div>
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
        {showTitle &&
          titlePosition === ThumbnailTitlePosition.BELOW &&
          renderTitle(image)}
        {showCaption &&
          (titlePosition != captionPosition || !showTitle) &&
          captionPosition === ThumbnailTitlePosition.BELOW &&
          renderCaption(image)}
      </>
    );
  }
);

export default SwiperImage;
