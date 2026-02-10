import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IImageDTO,
  ImageType,
  SliderNavigation,
  SliderNavigationPosition,
  ThumbnailTitlePosition,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {handleSlideChange} from './imagePreloader';
import './swiper-gallery.css';
import SwiperImage from './SwiperImage';

interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor?: string;
  padding?: number;
  loop?: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  playAndPauseAllowed?: boolean;
  slideClassName?: string;
  className?: string;
  width?: number;
  size?: number;
  height?: number;
  imagesCount: number;
  preLoadCount: number;
  scale?: any;
  allowTouchMove: boolean;
  perSlideOffset?: any;
  settings: ICubeSettings | ICardsSettings | ICarouselSettings;
  breakpoints?: any;
  titleCaptionHeight?: number;
  onClick?: (index: number) => void;
  externalPaginationId?: string;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
  padding,
  loop,
  effects,
  autoplay,
  delay,
  slideClassName,
  className,
  playAndPauseAllowed,
  width,
  size,
  height,
  preLoadCount,
  imagesCount,
  scale,
  allowTouchMove,
  perSlideOffset,
  settings,
  breakpoints,
  titleCaptionHeight,
  onClick,
  externalPaginationId,
}) => {
  if (!padding) {
    padding = 0;
  }
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [paddingTop, setPaddingTop] = useState<number>(0);
  const key = effects.effect + 'Effect';

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params.coverflowEffect.scale = scale;
      swiper.params.coverflowEffect.depth = scale > 1 ? -1 : 1;
    } else if (key === 'cardsEffect') {
      swiper.params.cardsEffect.perSlideOffset = perSlideOffset;
    }
    swiper.update();

    const scale_decimal = scale === 2 ? '10' : (scale + '').split('.')[1];

    let paddingTop =
      scale > 1
        ? (((parseInt(scale_decimal) * (swiper.slidesEl.clientHeight || 0)) /
            100) *
            Math.ceil((imagesCount || 0) / 2)) /
          2
        : 0;
    setPaddingTop(paddingTop);
  }, [scale, height, width, imagesCount, padding, perSlideOffset]);

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

  const handleOnChangeVideoAutoPlayAndPause = (swiper: SwiperType) => {
    if (!swiper) return;

    swiper.slides.forEach((slide: HTMLElement) => {
      const video = slide.querySelector<HTMLVideoElement>(
        'video.swiper-gallery__video'
      );

      if (!video) return;

      const isVisible = slide.classList.contains('swiper-slide-visible');

      if (isVisible) {
        if (video.paused) {
          if (video.readyState >= 3) {
            video.play().catch((err) => console.warn('Autoplay blocked:', err));
          } else {
            const onCanPlay = () => {
              video.removeEventListener('canplay', onCanPlay);
              video
                .play()
                .catch((err) => console.warn('Autoplay blocked:', err));
            };
            video.addEventListener('canplay', onCanPlay);
            video.load?.();
          }
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  };

  const dynamicThreshold = 6;

  return (
    <Swiper
      key={`${imagesCount}_${settings.dotsPosition}`}
      ref={swiperRef}
      {...effects}
      autoplay={
        autoplay || isPlaying
          ? {
              delay: delay,
              stopOnLastSlide: false,
              pauseOnMouseEnter: allowTouchMove,
            }
          : false
      }
      navigation={
        settings.navigation === SliderNavigation.ARROWS ||
        settings.navigation === SliderNavigation.ARROWS_AND_DOTS
      }
      modules={[
        Autoplay,
        Pagination,
        Navigation,
        ...(effects.additionalModules || []),
      ]}
      pagination={
        settings.navigation === SliderNavigation.DOTS ||
        settings.navigation === SliderNavigation.ARROWS_AND_DOTS
          ? {
              clickable: true,
              type: 'bullets',
              dynamicBullets: images.length > dynamicThreshold,
              dynamicMainBullets:
                images.length > dynamicThreshold ? dynamicThreshold - 1 : 0,
              ...(settings.dotsPosition ===
                SliderNavigationPosition.OUTSIDE && {
                el: `#${externalPaginationId || '#swiper-pagination-external'}`,
              }),
            }
          : false
      }
      grabCursor={allowTouchMove}
      allowTouchMove={allowTouchMove}
      loop={loop}
      className={className}
      loopAdditionalSlides={0}
      speed={settings.animationSpeed}
      breakpoints={breakpoints}
      onInit={() => {
        const swiper = swiperRef.current?.swiper;
        if (settings.dotsPosition === SliderNavigationPosition.OUTSIDE) {
          swiper.params.pagination.el = `#${
            externalPaginationId || '#swiper-pagination-external'
          }`;
        }
        handleOnChangeVideoAutoPlayAndPause(swiper);
      }}
      onSlideChange={(swiper: SwiperType) => {
        handleOnChangeVideoAutoPlayAndPause(swiper);
        handleSlideChange(swiperRef, images, preLoadCount);
      }}
      onTransitionEnd={(swiper: SwiperType) => {
        handleOnChangeVideoAutoPlayAndPause(swiper);
      }}
      onResize={(swiper: SwiperType) => {
        handleOnChangeVideoAutoPlayAndPause(swiper);
      }}
      onTouchStart={() => {
        const videos = document.querySelectorAll('.swiper-gallery__video');
        videos.forEach((v) => v.classList.add('no-pointer'));
      }}
      onTouchEnd={() => {
        const videos = document.querySelectorAll('.swiper-gallery__video');
        videos.forEach((v) => v.classList.remove('no-pointer'));
      }}
      style={{
        '--swiper-wrapper-transition-timing-function': 'ease-in-out',
        '--swiper-pagination-bottom': '10px',
        '--swiper-pagination-color': settings.activeDotColor,
        '--swiper-pagination-bullet-size': settings.dotsSize + 'px',
        '--swiper-pagination-bullet-inactive-color': settings.inactiveDotsColor,
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-horizontal-gap': settings.dotsGap + 'px',
        '--swiper-navigation-size': settings.arrowsSize + 'px',
        '--swiper-navigation-color': settings.arrowsColor,
        '--swiper-navigation-sides-offset': '20px',
        '--swiper-navigation-top-offset': `calc(50% + ${
          titleCaptionHeight &&
          ((settings.titlePosition === ThumbnailTitlePosition.ABOVE &&
            settings.titlePosition === settings.captionPosition) ||
          ((settings.titlePosition === ThumbnailTitlePosition.ABOVE ||
            settings.captionPosition === ThumbnailTitlePosition.ABOVE) &&
            settings.titlePosition !== ThumbnailTitlePosition.BELOW &&
            settings.captionPosition !== ThumbnailTitlePosition.BELOW &&
            settings.titlePosition !== settings.captionPosition)
            ? titleCaptionHeight / 2
            : (settings.titlePosition === ThumbnailTitlePosition.BELOW &&
                settings.titlePosition === settings.captionPosition) ||
              ((settings.titlePosition === ThumbnailTitlePosition.BELOW ||
                settings.captionPosition === ThumbnailTitlePosition.BELOW) &&
                settings.titlePosition !== ThumbnailTitlePosition.ABOVE &&
                settings.captionPosition !== ThumbnailTitlePosition.ABOVE &&
                settings.titlePosition !== settings.captionPosition)
            ? -titleCaptionHeight / 2
            : 0)
        }px)`,
        ...(key === 'cardsEffect' || key === 'cubeEffect'
          ? {width, height}
          : key === 'coverflowEffect'
          ? {
              paddingTop: `${paddingTop}px`,
              paddingBottom: `${paddingTop}px`,
            }
          : {}),
      }}
    >
      {images?.map((image: IImageDTO, index) => {
        const isVideo: boolean = image.type === ImageType.VIDEO;
        const coverflowOriginalIndex = images.findIndex(
          (img) => img.id === image.id
        );
        return (
          <SwiperSlide
            key={index}
            onClick={() => {
              /*The normalizedIndex is used to control the lightbox behavior accurately when using coverflowEffect.
                In this mode, I intentionally create duplicate slides for visual  purposes. However, these duplicates can lead to issues if they share the same index - such as breaking navigation.
                To prevent this, I use coverflowOriginalIndex that take the first origial image id  from 2 the same images*/
              const normalizedIndex =
                key === 'coverflowEffect' ? coverflowOriginalIndex : index;
              onClick?.(normalizedIndex);
            }}
            className={slideClassName}
            style={{
              backgroundColor: key !== 'coverflowEffect' ? backgroundColor : '',
              padding: key !== 'coverflowEffect' ? padding + 'px' : 0,
            }}
          >
            <SwiperImage
              key={index}
              image={image}
              images={images}
              index={index}
              imagesCount={imagesCount}
              backgroundColor={backgroundColor}
              padding={padding}
              size={size}
              galleryKey={key}
              settings={settings}
              titleCaptionHeight={titleCaptionHeight}
            />
          </SwiperSlide>
        );
      })}
      {playAndPauseAllowed && (
        <IconButton
          className="playPauseButton"
          onClick={isPlaying ? handlePause : handlePlay}
          aria-label={isPlaying ? 'pause' : 'play'}
          size="large"
          style={{
            top: `calc(50% + ${
              titleCaptionHeight &&
              ((settings.titlePosition === ThumbnailTitlePosition.ABOVE &&
                settings.titlePosition === settings.captionPosition) ||
              ((settings.titlePosition === ThumbnailTitlePosition.ABOVE ||
                settings.captionPosition === ThumbnailTitlePosition.ABOVE) &&
                settings.titlePosition !== ThumbnailTitlePosition.BELOW &&
                settings.captionPosition !== ThumbnailTitlePosition.BELOW &&
                settings.titlePosition !== settings.captionPosition)
                ? titleCaptionHeight / 2
                : (settings.titlePosition === ThumbnailTitlePosition.BELOW &&
                    settings.titlePosition === settings.captionPosition) ||
                  ((settings.titlePosition === ThumbnailTitlePosition.BELOW ||
                    settings.captionPosition ===
                      ThumbnailTitlePosition.BELOW) &&
                    settings.titlePosition !== ThumbnailTitlePosition.ABOVE &&
                    settings.captionPosition !== ThumbnailTitlePosition.ABOVE &&
                    settings.titlePosition !== settings.captionPosition)
                ? -titleCaptionHeight / 2
                : 0)
            }px - var(--swiper-navigation-size, 30px))`,
          }}
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
export default SwiperGallery;
