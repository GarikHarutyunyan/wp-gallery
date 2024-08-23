import {IImageDTO, ImageType} from 'data-structures';
import React, {useEffect, useRef} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import './swiper-gallery.css';

interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor: string;
  padding: number;
  loop: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  className?: string;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
  padding,
  loop,
  effects,
  autoplay,
  delay,
  className,
}) => {
  const swiperRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper?.autoplay) {
      swiper.autoplay.stop();
    }
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (autoplay && swiper?.autoplay) {
      swiper.autoplay.start();
    }
    if (!autoplay && swiper?.autoplay) {
      swiper.autoplay.stop();
    }

    if (!autoplay) {
      swiper.autoplay.stop();
    }
  }, [autoplay]);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const onMouseMove = () => {
    if (isDragging.current && videoRef.current) {
      (videoRef.current as HTMLVideoElement).controls = false;
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).controls = true;
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      autoplay={{delay, stopOnLastSlide: true, pauseOnMouseEnter: true}}
      grabCursor={true}
      loop={loop}
      slidesPerView={1}
      className={className}
      {...effects}
    >
      {images?.map((image: IImageDTO) => {
        const isVideo: boolean = image.type === ImageType.VIDEO;

        return (
          <SwiperSlide key={image.id}>
            {!isVideo ? (
              <img
                src={image.original.url}
                srcSet={`${image.thumbnail.url} ${image.thumbnail.width}w, ${image.medium_large.url} ${image.medium_large.width}w, ${image.original.url} ${image.original.width}w`}
                alt={image.title}
                style={{
                  background: backgroundColor,
                  padding: padding + "px",
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={image.original.url}
                poster={image.medium_large.url}
                style={{
                  background: backgroundColor,
                  padding: padding + "px",
                }}
                className={'swiper-gallery__video'}
                controls
                // draggable={true}
                onMouseDown={onMouseDown}
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export {SwiperGallery};
