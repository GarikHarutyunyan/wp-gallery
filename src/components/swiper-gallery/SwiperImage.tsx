import ReImage from 'core-components/re-image/ReImage';
import {IImageDTO, ImageType} from 'data-structures';
import React, {forwardRef, useRef} from 'react';

interface ISwiperImageProps {
  galleryKey: string;
  image: IImageDTO;
  images: IImageDTO[];
  index: number;
  imagesCount: number;
  backgroundColor?: string;
  padding?: number;
  size?: number;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isOverlay?: boolean;
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
      videoRef,
      galleryKey: key,
      isOverlay,
    }: ISwiperImageProps,
    ref
  ) => {
    const wrapperRef = useRef(null);
    const isVideo: boolean = image.type === ImageType.VIDEO;
    const shouldLoadImage =
      key === 'cardsEffect'
        ? index < (imagesCount || 0) + 1
        : index < (imagesCount || 0) / 2 + 1 ||
          index > images.length - (imagesCount || 0) / 2 - 1;
    return (
      <div ref={wrapperRef} style={{height: '100%', width: '100%'}}>
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
              e.stopPropagation();
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
            />

            {isOverlay && (
              <div
                className="video-drag-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  pointerEvents: 'auto',
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

export default SwiperImage;
