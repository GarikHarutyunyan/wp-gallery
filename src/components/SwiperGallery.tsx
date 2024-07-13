import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import useConfigureSwiper from 'custom-hooks/useConfigureSwiper';
import {IImageDTO} from 'data-structures';
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
import './carousel-gallery/CarouselGallery.css';
interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor: string;
  loop: boolean;
  pagination: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  playAndPouseAllowed: boolean;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
  loop,
  pagination,
  effects,
  autoplay,
  delay,
  playAndPouseAllowed,
}) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);

  const key = effects.effect + 'Effect';
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
    swiper.params[key].shadow = false;
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

    if (!playAndPouseAllowed && !autoplay) {
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

  return (
    <Paper elevation={11} sx={{padding: '0px 20px 0px 20px'}}>
      <Swiper
        ref={swiperRef}
        autoplay={{delay: delay}}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        grabCursor={true}
        loop={loop}
        loopedSlides={10}
        pagination={pagination}
        {...effects}
        style={{background: backgroundColor, ...effects.style}}
      >
        {images?.map((val: any) => (
          <SwiperSlide key={Math.random()}>
            <img
              key={Math.random()}
              src={val.original.url}
              className="swiper-lazy"
              alt={`Slide ${val.id}`}
            />
          </SwiperSlide>
        ))}

        {(autoplay || isPlaying) && (
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )}
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
    </Paper>
  );
};

export {SwiperGallery};
