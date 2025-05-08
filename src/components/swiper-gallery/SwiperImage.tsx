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
  onMouseDown?: (e: React.MouseEvent) => void;
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
      onMouseDown,
      galleryKey: key,
    }: ISwiperImageProps,
    ref
  ) => {
    const wrapperRef = useRef(null);
    const isVideo: boolean = image.type === ImageType.VIDEO;

    return (
      <div ref={wrapperRef} style={{height: '100%', width: '100%'}}>
        {!isVideo ? (
          <ReImage
            wrapperRef={wrapperRef}
            data-index={index}
            src={
              index < (imagesCount || 0) + 1 ||
              index > images.length - (imagesCount || 0) - 1
                ? image.original.url
                : undefined
            }
            sizes={`${size}px`}
            srcSet={
              index < (imagesCount || 0) + 1 ||
              index > images.length - (imagesCount || 0) - 1
                ? `${images[index].thumbnail.url} ${images[index].thumbnail.width}w, ${images[index].medium_large.url} ${images[index].medium_large.width}w, ${images[index].original.url} ${images[index].original.width}w`
                : undefined
            }
            className="lazy"
            alt={image.title}
            style={{
              background: key !== 'coverflowEffect' ? backgroundColor : '',
              padding: key !== 'coverflowEffect' ? padding + 'px' : 0,
            }}
          />
        ) : (
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
            onMouseDown={onMouseDown}
          />
        )}
      </div>
    );
  }
);

export default SwiperImage;
