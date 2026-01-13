import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IImageDTO,
  ImageType,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
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
  onClick?: (index: number) => void;
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
  onClick,
}) => {
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [paddingTop, setPaddingTop] = useState<number>(0);
  const key = effects.effect + 'Effect';
  const prevIndexRef = useRef<number | null>(null);

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

  const handleOnChangeVideoAutoPlayAndPause = (
    swiper: any,
    shouldPausePrevious: boolean = true
  ) => {
    if (!swiper) return;

    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    const activeVideo = activeSlide?.querySelector(
      'video.swiper-gallery__video'
    );

    if (shouldPausePrevious && prevIndexRef.current !== null) {
      const prevSlide = swiper.slides[prevIndexRef.current];
      const prevVideo = prevSlide?.querySelector('video.swiper-gallery__video');

      if (prevVideo && prevVideo !== activeVideo && !prevVideo.paused) {
        prevVideo.pause();
      }
    }

    if (activeVideo) {
      if (activeVideo.readyState >= 3) {
        activeVideo
          .play()
          .catch((err: any) => console.warn('Autoplay blocked:', err));
      } else {
        const onCanPlay = () => {
          activeVideo.removeEventListener('canplay', onCanPlay);
          activeVideo
            .play()
            .catch((err: any) => console.warn('Autoplay blocked:', err));
        };
        activeVideo.addEventListener('canplay', onCanPlay);
        // Optionally, force the video to load if it hasn't started.
        activeVideo.load && activeVideo.load();
      }
    }

    prevIndexRef.current = activeIndex;
  };

  return (
    <Swiper
      key={imagesCount || 0}
      ref={swiperRef}
      autoplay={
        autoplay || isPlaying
          ? {
              delay: delay,
              stopOnLastSlide: false,
              pauseOnMouseEnter: allowTouchMove,
            }
          : false
      }
      grabCursor={allowTouchMove}
      allowTouchMove={allowTouchMove}
      loop={loop}
      pagination={false}
      className={className}
      loopAdditionalSlides={0}
      onInit={() => {
        const swiper = swiperRef.current?.swiper;
        handleOnChangeVideoAutoPlayAndPause(swiper, false); // Don't pause anything on init
      }}
      onSlideChange={() => {
        const swiper = swiperRef.current?.swiper;
        handleOnChangeVideoAutoPlayAndPause(swiper, true); // Pause previous if needed
        handleSlideChange(swiperRef, images, preLoadCount);
      }}
      onTouchStart={() => {
        const videos = document.querySelectorAll('.swiper-gallery__video');
        videos.forEach((v) => v.classList.add('no-pointer'));
      }}
      onTouchEnd={() => {
        const videos = document.querySelectorAll('.swiper-gallery__video');
        videos.forEach((v) => v.classList.remove('no-pointer'));
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
