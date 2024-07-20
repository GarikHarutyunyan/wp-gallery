import {IImageDTO} from 'data-structures';
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

interface ISwiperGalleryProps {
  width: number;
  height: number;
  images: IImageDTO[];
  backgroundColor: string;
  loop: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  width,
  height,
  images,
  backgroundColor,
  loop,
  effects,
  autoplay,
  delay,
}) => {
  const swiperRef = useRef<any>(null);

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

  return (
    <Swiper
      ref={swiperRef}
      autoplay={{delay, stopOnLastSlide: true}}
      grabCursor={true}
      loop={loop}
      slidesPerView={1}
      {...effects}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '80%',
        maxHeight: '100vh',
      }}
    >
      {images?.map((image: IImageDTO) => (
        <SwiperSlide key={image.id}>
          <img
            src={image.original.url}
            srcSet={`${image.thumbnail.url} ${image.thumbnail.width}w, ${image.medium_large.url} ${image.medium_large.width}w, ${image.original.url} ${image.original.width}w`}
            className={'swiper-lazy'}
            alt={image.title}
            style={{
              background: backgroundColor,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export {SwiperGallery};
