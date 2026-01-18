import {EffectCreative, EffectFade, EffectFlip} from 'swiper/modules';

export const getSwiperEffectOptions = (animation: string) => {
  switch (animation) {
    case 'fade':
      return {
        effect: 'fade',
        modules: [EffectFade],
        effectOptions: {fadeEffect: {crossFade: true}},
      };
    case 'flip':
      return {
        effect: 'flip',
        modules: [EffectFlip],
        effectOptions: {}, // default flip options
      };
    case 'creative':
      return {
        effect: 'creative',
        modules: [EffectCreative],
        effectOptions: {
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          },
        },
      };
    default:
      return {effect: 'slide', modules: [], effectOptions: {}};
  }
};
