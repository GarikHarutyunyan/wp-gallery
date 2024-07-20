import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/SwiperGallery';
import {ICubeSettings} from 'data-structures';
import React, {useEffect} from 'react';
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
  const {cubeSettings: settings} = useSettings();
  const {
    width,
    height,
    isInfinite,
    backgroundColor,
    autoplay,
    slideDuration,
    shadow,
  } = settings as ICubeSettings;

  useEffect(() => {
    const cubeShadow = document.querySelector(
      '.swiper-cube .swiper-cube-shadow'
    ) as HTMLElement;

    cubeShadow.style.width = shadow ? '100%' : '0%';
  }, [shadow]);

  return (
    <SwiperGallery
      key={+isInfinite}
      width={width}
      height={height}
      effects={effects}
      loop={isInfinite}
      backgroundColor={backgroundColor}
      images={images || []}
      autoplay={autoplay}
      delay={slideDuration}
    />
  );
};

export {CubeGallery};
