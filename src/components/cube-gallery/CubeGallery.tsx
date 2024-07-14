import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/SwiperGallery';
import {ICarouselSettings} from 'data-structures';
import React from 'react';
import {Autoplay, EffectCube} from 'swiper/modules';
import '../carousel-gallery/CarouselGallery';

interface ITCarouselGalleryProps {
  onClick?: (index: number) => void;
}

const CubeGallery: React.FC<ITCarouselGalleryProps> = ({onClick}) => {
  const {images} = useData();
  const {carouselSettings: settings} = useSettings();
  const {
    backgroundColor,

    loop,
    pagination,
    autoplay,
    delay,
    playAndPouseAllowed,
  } = settings as ICarouselSettings;

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

    // preloadImages: false,
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,
  };

  return (
    <SwiperGallery
      key={'cube'}
      effects={effects}
      loop={loop}
      backgroundColor={backgroundColor}
      images={images || []}
      autoplay={autoplay}
      delay={delay}
      playAndPouseAllowed={playAndPouseAllowed}
    />
  );
};

export {CubeGallery};
