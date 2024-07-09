import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './CarouselGallery.css';
import {useSwiperEffects} from './effects';
import {SwiperGallery} from './SwiperGallery';

type EffectTypes = 'coverflow' | 'cube' | 'cards' | 'creative';

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
