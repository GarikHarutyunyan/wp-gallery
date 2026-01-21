import {EffectCreative, EffectFade, EffectFlip} from 'swiper/modules';

export const getSwiperEffectOptions = (
  animation: string,
  direction: 'horizontal' | 'vertical'
) => {
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
        effectOptions: {
          flipEffect: {
            slideShadows: false, // shadows often cause clipping bugs
            limitRotation: true,
          },
        }, // default flip options
      };
    // case 'creative':
    //   return {
    //     effect: 'creative',
    //     modules: [EffectCreative],
    //     effectOptions: {
    //       creativeEffect: {
    //         prev: {
    //           shadow: true,
    //           translate: [0, 0, -400],
    //         },
    //         next: {
    //           translate: ['100%', 0, 0],
    //         },
    //       },
    //     },
    //   };
    case 'creative':
      return {
        effect: 'creative',
        modules: [EffectCreative],
        effectOptions: {
          creativeEffect: {
            prev: {
              shadow: false,
              translate:
                direction === 'horizontal' ? ['-20%', 0, -1] : [0, '-20%', -1],
            },
            next: {
              shadow: false,
              translate:
                direction === 'horizontal' ? ['100%', 0, 0] : [0, '100%', 0],
            },
          },
        },
      };
    default:
      return {effect: 'slide', modules: [], effectOptions: {}};
  }
};
