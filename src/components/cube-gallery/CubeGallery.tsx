import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/SwiperGallery';
import {ICubeSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectCube} from 'swiper/modules';
import './cube-gallery.css';

const effects = {
  id: 2,
  effect: 'cube',
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  modules: [EffectCube, Autoplay],
};

const CubeGallery: React.FC = () => {
  const {images} = useData();
  const {cubeSettings: settings, wrapperRef} = useSettings();
  const {
    width,
    height,
    isInfinite,
    backgroundColor,
    autoplay,
    slideDuration,
    shadow,
  } = settings as ICubeSettings;
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

  useEffect(() => {
    const cubeShadow = document.querySelector(
      '.swiper-cube .swiper-cube-shadow'
    ) as HTMLElement;

    cubeShadow.style.width = shadow ? '100%' : '0%';
  }, [shadow]);

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <SwiperGallery
        key={+isInfinite}
        effects={effects}
        loop={isInfinite}
        backgroundColor={backgroundColor}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
      />
    </Box>
  );
};

export {CubeGallery};
