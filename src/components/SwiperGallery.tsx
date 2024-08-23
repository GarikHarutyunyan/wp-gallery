import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {IImageDTO, ImageType} from 'data-structures';
import useConfigureSwiper from 'hooks/useConfigureSwiper';
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

interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor?: string;
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
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
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
}) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);
  const key = effects.effect + 'Effect';
  const previusIndex = useRef<number>(-1);
  const widthChange = useRef<boolean>(false);
  const prevActiveSlideDimensions = useRef({width: 0, height: 0});

  useConfigureSwiper(swiperRef, key);
  const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        (1 - progress).toString()
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    // Select the container

    if (swiper?.autoplay) {
      swiper.autoplay.stop();
    }
  }, []);

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
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      grabCursor={true}
      loop={loop}
      pagination={false}
      slidesPerView={'auto'}
      className={className}
      onSlideChange={() => {
        if (key === 'coverflowEffect' && handleSlideChange) {
          handleSlideChange(previusIndex, swiperRef);
        }
      }}
      {...effects}
      style={
        key === 'cardsEffect' || key === 'flipEffect' || key === 'cubeEffect'
          ? {
              width,
              height,
            }
          : {}
      }
    >
      {images?.map((image: IImageDTO, index) => {
        const isVideo: boolean = image.type === ImageType.VIDEO;
        const visible = document.querySelector('.swiper-slide-visible');

        return (
          <SwiperSlide
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
                      : index < 4 ||
                        (index >= images.length - 5 &&
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
                  background: key !== 'coverflow' ? backgroundColor : '',
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={image.original.url}
                poster={image.medium_large.url}
                style={{
                  background: backgroundColor,
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
      {(autoplay || isPlaying) && playAndPouseAllowed && (
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      )}
      {playAndPouseAllowed && (
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
