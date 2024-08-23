import {useSettings} from 'components/settings';
import {
  Autoplay,
  EffectCreative,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper/modules';

export const useSwiperEffects = () => {
  const {carouselSettings: settings} = useSettings();

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

  return {creative, flip};
};
