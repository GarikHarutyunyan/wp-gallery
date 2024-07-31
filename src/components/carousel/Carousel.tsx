import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {SwiperGallery} from '../SwiperGallery';
import './carousel.css';
import {useSwiperEffects} from './effects';

type EffectTypes = 'coverflow' | 'cards' | 'creative';

interface ITCarouselProps {
  onClick?: (index: number) => void;
}

const Carousel: React.FC<ITCarouselProps> = ({onClick}) => {
  const {images} = useData();
  const {carouselSettings: settings, wrapperRef} = useSettings();
  const {
    backgroundColor,

    loop,
    pagination,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
    width,
    height,
  } = settings as ICarouselSettings;
  const selectedEffect = useSwiperEffects()[effects as EffectTypes];
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth * 0.8 || width
  );
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = containerWidth / ratio;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth * 0.8 || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <SwiperGallery
        key={selectedEffect.id}
        effects={selectedEffect}
        pagination={pagination}
        loop={loop}
        backgroundColor={backgroundColor}
        images={images || []}
        autoplay={autoplay}
        delay={delay}
        playAndPouseAllowed={playAndPouseAllowed}
      />
    </Box>
  );
};

export {Carousel};
