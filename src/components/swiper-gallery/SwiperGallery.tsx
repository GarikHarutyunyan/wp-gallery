import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {IImageDTO, ImageType} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
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
  playAndPauseAllowed?: boolean;
  className?: string;
  width?: number;
  size?: number;
  height?: number;
  imagesCount: number;
  preLoadCount: number;
  scale?: any;
  allowTouchMove: boolean;
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
  playAndPauseAllowed,
  width,
  size,
  height,
  preLoadCount,
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
  const previousIndex = useRef<number>(-1);
  useConfigureSwiper(swiperRef, key);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const scale_decimal = scale === 2 ? '10' : (scale + '').split('.')[1];

    let paddingTop =
      scale > 1
        ? (((parseInt(scale_decimal) *
            (swiper.slidesEl.clientHeight || 0)) /
            100) *
            Math.ceil((imagesCount || 0) / 2)) /
          2
        : 0;
    setPaddingTop(paddingTop);
  }, [scale, height, width, imagesCount, padding]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      if (autoplay) {
        swiper.autoplay.start();
        setIsPlaying(true);
      } else {
        swiper.autoplay.stop();
        setIsPlaying(false);
      }
    }
  }, [autoplay, playAndPauseAllowed]);

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

  const loadImagesInRange = (startIndex: number, endIndex: number) => {
    for (let i = startIndex; i <= endIndex; i++) {
      const imgElement = document.querySelector(
          `.lazy[data-index="${i}"]`
      ) as HTMLImageElement;

      if (
          imgElement &&
          images &&
          (!imgElement.src || imgElement.src === undefined)
      ) {
        imgElement.setAttribute('src', images[i].original.url);
        imgElement.setAttribute(
            'srcSet',
            `${images[i].thumbnail.url} ${images[i].thumbnail.width}w, ${images[i].medium_large.url} ${images[i].medium_large.width}w, ${images[i].original.url} ${images[i].original.width}w`
        );
      }
    }
  };

  const handleSlideChange = (previousIndex: any, swiperRef: any, imagesCount: number, preLoadCount: number) => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = parseInt(swiper.realIndex);

    if (images && previousIndex.current !== -1) {
      var loadStartIndex, loadEndIndex;
      if (
          activeIndex > previousIndex.current
      ) {
        loadStartIndex = activeIndex;
        loadEndIndex = Math.min(
            imagesCount + activeIndex + preLoadCount,
            images.length
        );

      } else {
        loadStartIndex = activeIndex
            ? Math.max(
                activeIndex - (imagesCount !== undefined ? imagesCount : 0) - preLoadCount,
                0
            )
            : 0;
        loadEndIndex = activeIndex;
      }
      loadImagesInRange(loadStartIndex, loadEndIndex);
    }
    previousIndex.current = activeIndex;
  };

  return (
    <Swiper
      key={(imagesCount || 0)}
      ref={swiperRef}
      autoplay={autoplay || isPlaying ? {
        delay: delay,
        stopOnLastSlide: false,
        pauseOnMouseEnter: allowTouchMove} : false}
      grabCursor={allowTouchMove}
      allowTouchMove={allowTouchMove}
      loop={loop}
      pagination={false}
      className={className}
      loopAdditionalSlides={0}
      onSlideChange={() => {
        if (handleSlideChange) {
          handleSlideChange(previousIndex, swiperRef, imagesCount, preLoadCount);
        }
      }}
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
          >
            {!isVideo ? (
              <img
                data-index={index}
                src={
                    index < (imagesCount || 0) + 1 || index > images.length - (imagesCount || 0) - 1
                      ? image.original.url
                      : undefined
                }
                sizes={`${size}px`}
                srcSet={
                    index < (imagesCount || 0) + 1 || index > images.length - (imagesCount || 0) - 1
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
          </SwiperSlide>
        );
      })}

      {playAndPauseAllowed && (
        <IconButton
          className="playPauseButton"
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
