import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper/modules';

export const useSwiperEffects = () => {
  const coverflow = {
    id: 1,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    effect: 'coverflow',
    loopedSlides: 8,
    coverflowEffect: {
      rotate: 80,

      modifier: 0.2,
      scale: 1.1,
      slideShadows: true,
    },
    navigation: true,

    modules: [EffectCoverflow, Pagination, Autoplay, Navigation],
  };

  const cube = {
    id: 2,
    effect: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    modules: [EffectCube, Pagination, Autoplay, Navigation],
    navigation: true,
    style: {width: '300px', height: '300px', padding: '50px'},
  };

  const cards = {
    id: 3,
    effect: 'cards',
    modules: [EffectCards, Autoplay, Navigation],
    navigation: true,
    style: {width: '300px', height: '300px', padding: '150px'},
  };

  const creative = {
    id: 4,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    modules: [EffectCreative, Autoplay],
  };
  const flip = {
    id: 5,
    effect: 'flip',
    modules: [EffectFlip, Pagination, Navigation, Autoplay],
    navigation: true,
    style: {width: '300px', height: '300px', padding: '50px'},
  };

  return {coverflow, cube, cards, creative, flip};
};
