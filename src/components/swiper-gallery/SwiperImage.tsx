import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import {
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IImageDTO,
  ImageType,
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
    }: ISwiperImageProps,
    ref
  ) => {
    const wrapperRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVideo: boolean = image.type === ImageType.VIDEO;
    const shouldLoadImage =
      key === 'cardsEffect'
        ? index < (imagesCount || 0) + 1
        : index < (imagesCount || 0) / 2 + 1 ||
          index > images.length - (imagesCount || 0) / 2 - 1;
    const {hoverEffect} = settings;

    return (
      <div
        ref={wrapperRef}
        className={clsx(
          'swiper-gallery__image-wrapper',
          'swiper-gallery__image-wrapper_overflow',
          'swiper-gallery__image-wrapper_' + hoverEffect
        )}
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
            style={{
              background: key !== 'coverflowEffect' ? backgroundColor : '',
              padding: key !== 'coverflowEffect' ? padding + 'px' : 0,
            }}
          />
        ) : (
          <div
            style={{position: 'relative', width: '100%', height: '100%'}}
            onClick={(e) => {
              if (key === 'coverflowEffect') return;
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
              style={{
                background: key !== 'coverflowEffect' ? backgroundColor : '',
                padding: key !== 'coverflowEffect' ? padding + 'px' : 0,
              }}
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
      </div>
    );
  }
);

export default SwiperImage;
