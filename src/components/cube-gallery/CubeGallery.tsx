import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/SwiperGallery';
import {ICarouselSettings} from 'data-structures';
import React from 'react';
import {Autoplay, EffectCube, Navigation, Pagination} from 'swiper/modules';
import '../carousel-gallery/CarouselGallery';

interface ITCarouselGalleryProps {
  onClick?: (index: number) => void;
}

const CubeGallery: React.FC<ITCarouselGalleryProps> = ({onClick}) => {
  const {images} = useData();
  const {carouselSettings: settings} = useSettings();
  const {
    backgroundColor,
    width,
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
    },
    modules: [EffectCube, Pagination, Autoplay, Navigation],
    navigation: true,
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
        resistanceRatio: 0.85,
      },
    },
    // preloadImages: false,
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,
    style: {width: '300px', height: '300px', padding: '50px'},
  };

  return (
    <SwiperGallery
      key={'cube'}
      effects={effects}
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

export {CubeGallery};
