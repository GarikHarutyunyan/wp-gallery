import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper/modules';
export const useSwiperEffects = () => {
  const {carouselSettings: settings} = useSettings();
  const {spaceBetween, imagesCount, centeredSlides} =
    settings as ICarouselSettings;

  const coverflow = {
    id: 1,
    spaceBetween: spaceBetween,
    slidesPerView: imagesCount || 'auto',
    centeredSlides: centeredSlides,
    effect: 'coverflow',
    loopedSlides: 8,
    coverflowEffect: {
      rotate: 80,
      depth: -100,
      modifier: 0.2,
      scale: 1.2,
      slideShadows: true,
    },
    navigation: true,
    // preloadImages: false,
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,

    modules: [EffectCoverflow, Pagination, Autoplay, Navigation],
  };

  const cards = {
    id: 2,
    effect: 'cards',
    modules: [EffectCards, Autoplay, Navigation],
    navigation: true,
    cardsEffect: {
      rotate: false,
      perSlideOffset: 8,
      perSlideRotate: 2,
    },
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,
    style: {width: '400px', height: '400px', padding: '150px'},
  };

  const creative = {
    id: 3,
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
    id: 4,
    effect: 'flip',
    modules: [EffectFlip, Pagination, Navigation, Autoplay],
    navigation: true,
    // preloadImages: false,
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,
    style: {width: '300px', height: '300px', padding: '50px'},
  };

  return {coverflow, cards, creative, flip};
};
