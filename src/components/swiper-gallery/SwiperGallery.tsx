import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {IImageDTO, ImageType} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
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

import useConfigureSwiper from './useConfigureSwiper';

interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor?: string;
  padding?: number;
  loop?: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  playAndPouseAllowed?: boolean;
  className?: string;
  width?: number;
  height?: number;
  imagesCount?: number;
  handleSlideChange?: any;
  handleThumbnailClick?: any;
  scale?: any;
  allowTouchMove?: boolean;
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
  playAndPouseAllowed,
  width,
  height,
  handleSlideChange,
  handleThumbnailClick,
  imagesCount,
  scale,
  allowTouchMove,
}) => {
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [paddingTop, setPaddingTop] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);
  const key = effects.effect + 'Effect';
  const previusIndex = useRef<number>(-1);

  useConfigureSwiper(swiperRef, key);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper?.autoplay) {
      swiper.autoplay.stop();
    }
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const scale_decimal = scale === 2 ? '10' : (scale + '').split('.')[1];

    let paddingTop =
      scale > 1
        ? (((parseInt(scale_decimal) *
            (swiper.slidesEl.childNodes[0].clientHeight || 0)) /
            100) *
            Math.ceil((imagesCount || 0) / 2)) /
          2
        : 0;

    setPaddingTop(paddingTop);
  }, [scale, height, width, imagesCount, padding]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (autoplay && swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
    if (!autoplay && swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }

    if (!autoplay) {
      swiper.autoplay.stop();
    }
  }, [autoplay, playAndPouseAllowed]);

  const handlePlay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

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
      pagination={false}
      className={className}
      onSlideChange={() => {
        if (key === 'coverflowEffect' && handleSlideChange) {
          handleSlideChange(previusIndex, swiperRef);
        }
      }}
      allowTouchMove={allowTouchMove}
      // onTouchEnd={() => {
      //   console.log('end');
      //   const swiper = swiperRef.current?.swiper;

      //   if (swiper && images.length <= (imagesCount || 0) * 2) {
      //     const prevSlide = swiper.el.querySelector('.swiper-slide-prev');
      //     const activeSlide = swiper.el.querySelector('.swiper-slide-active');
      //     console.log(activeSlide.getAttribute('data-swiper-slide-index'));

      //     prevSlide.click();

      //     const index = Math.floor(imagesCount || 0) / 2;
      //     console.log(index);
      //     swiper.slideTo(8);
      //   } else {
      //     console.log('Swiper instance not found');
      //   }
      // }}
      {...effects}
      style={
        key === 'cardsEffect' || key === 'cubeEffect'
          ? {
              width,
              height,
            }
          : key === 'coverflowEffect'
          ? {
              paddingTop: `${paddingTop}px`,
              paddingBottom: `${paddingTop}px`,
            }
          : {}
      }
    >
      {images?.map((image: IImageDTO, index) => {
        const isVideo: boolean = image.type === ImageType.VIDEO;

        return (
          <SwiperSlide
            key={index}
            onClick={() => {
              if (key === 'coverflowEffect' && handleSlideChange) {
                handleThumbnailClick(index, swiperRef);
              }
            }}
          >
            {!isVideo ? (
              <img
                data-index={index}
                src={
                  (
                    key !== 'coverflowEffect'
                      ? image.original.url
                      : index < (imagesCount || 0) ||
                        (index >= images.length - (imagesCount || 0) &&
                          key === 'coverflowEffect')
                  )
                    ? image.original.url
                    : undefined
                }
                srcSet={
                  key !== 'coverflowEffect'
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
                // draggable={true}
                onMouseDown={onMouseDown}
              />
            )}
          </SwiperSlide>
        );
      })}

      {playAndPouseAllowed && (
        <IconButton
          onClick={isPlaying ? handlePause : handlePlay}
          aria-label={isPlaying ? 'pause' : 'play'}
          size="large"
        >
          {isPlaying ? (
            <PauseIcon fontSize="inherit" />
          ) : (
            <PlayArrowIcon fontSize="inherit" />
          )}
        </IconButton>
      )}
    </Swiper>
  );
};

export {SwiperGallery};
function uselayouteffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.');
}
