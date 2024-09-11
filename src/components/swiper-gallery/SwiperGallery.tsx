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
  height?: number;
  imagesCount?: number;
  handleCarouselSlideChange?: any;
  handleCardsSlideChange?: any;
  handleThumbnailClick?: any;
  scale?: any;
  perSlideOffset?: any;
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
  height,
  handleCarouselSlideChange,
  handleCardsSlideChange,
  handleThumbnailClick,
  imagesCount,
  scale,
  perSlideOffset,
}) => {
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [paddingTop, setPaddingTop] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);
  const key = effects.effect + 'Effect';

  const previousIndex = useRef<number>(-1);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params.coverflowEffect.scale = scale;
      swiper.params.coverflowEffect.depth = scale > 1 ? -1 : 1;
      swiper.update();
    } else if (key === 'cardsEffect') {
      swiper.params.cardsEffect.perSlideOffset = perSlideOffset;
      swiper.update();
    }

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
      console.log(swiper.autoplay);
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
      key={(imagesCount || 0)}
      ref={swiperRef}
      autoplay={autoplay || isPlaying ? {
        delay: delay,
        stopOnLastSlide: false,
        pauseOnMouseEnter: key === 'cubeEffect'} : false}
      grabCursor={key !== 'coverflowEffect'}
      allowTouchMove={key !== 'coverflowEffect'}
      loop={loop}
      pagination={false}
      className={className}
      loopAdditionalSlides={0}
      onSlideChange={() => {
        if (key === 'coverflowEffect' && handleCarouselSlideChange) {
          handleCarouselSlideChange(previousIndex, swiperRef);
        } else if (key === 'cardsEffect' && handleCardsSlideChange) {
          handleCardsSlideChange(swiperRef);
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
          <SwiperSlide key={index}>
            {!isVideo ? (
              <img
                data-index={index}
                src={
                  key === 'cubeEffect'
                    ? image.original.url
                    : (key === 'coverflowEffect' &&
                        index < (imagesCount || 0) + 1) ||
                      index > images.length - (imagesCount || 0) - 1
                    ? image.original.url
                    : key === 'cardsEffect' && index < 5
                    ? image.original.url
                    : undefined
                }
                srcSet={
                  key === 'cubeEffect'
                    ? image.original.url
                    : (key === 'coverflowEffect' &&
                        index < (imagesCount || 0) + 1) ||
                      index > images.length - (imagesCount || 0) - 1
                    ? `${images[index].thumbnail.url} ${images[index].thumbnail.width}w, ${images[index].medium_large.url} ${images[index].medium_large.width}w, ${images[index].original.url} ${images[index].original.width}w`
                    : key === 'cardsEffect' && index < 5
                    ? image.original.url
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
