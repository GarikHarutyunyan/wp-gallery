import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React from 'react';

import {SwiperGallery} from '../SwiperGallery';
import './CarouselGallery.css';
import {useSwiperEffects} from './effects';

type EffectTypes = 'coverflow' | 'cards' | 'creative';

interface ITCarouselGalleryProps {
  onClick?: (index: number) => void;
}

const CarouselGallery: React.FC<ITCarouselGalleryProps> = ({onClick}) => {
  const {images} = useData();
  const {carouselSettings: settings} = useSettings();
  const {
    backgroundColor,
    width,
    loop,
    pagination,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
  } = settings as ICarouselSettings;
  const selectedEffect = useSwiperEffects()[effects as EffectTypes];

  return (
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
  );
};

export {CarouselGallery};
