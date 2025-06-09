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
  onClick,
}) => {
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [paddingTop, setPaddingTop] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);
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
      onSlideChange={() => {
        if (key === 'coverflowEffect') return;
        handleSlideChange(swiperRef, images, preLoadCount);
      }}
      onSlideChangeTransitionStart={() => {
        if (key !== 'coverflowEffect') return;
        handleSlideChange(swiperRef, images, preLoadCount);
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
                In this mode, I intentionally create duplicate slides for visual  purposes. However, these duplicates can lead to issues if they share the same index — such as breaking navigation.
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
              videoRef={videoRef}
              onMouseDown={onMouseDown}
              galleryKey={key}
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
