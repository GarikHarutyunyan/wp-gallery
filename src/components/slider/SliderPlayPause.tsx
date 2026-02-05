import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {useEffect} from 'react';
import type {Swiper as SwiperType} from 'swiper';

interface SliderPlayPauseProps {
  swiperRef: React.MutableRefObject<SwiperType | null>;
  autoplay: boolean;
  isSliderAllowed: boolean;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SliderPlayPause: React.FC<SliderPlayPauseProps> = ({
  swiperRef,
  autoplay,
  isSliderAllowed,
  isPlaying,
  setIsPlaying,
}) => {
  const handlePlay = () => {
    const swiper = swiperRef.current;
    if (swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = swiperRef.current;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;

    if (autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    } else {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  }, [autoplay, isSliderAllowed, swiperRef]);

  if (!isSliderAllowed) return null;

  return (
    <IconButton
      className="slider__play-pause"
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
  );
};
