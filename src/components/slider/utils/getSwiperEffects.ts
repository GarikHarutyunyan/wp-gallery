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
    case 'creative':
      return {
        effect: 'creative',
        modules: [EffectCreative],
        effectOptions: {
          creativeEffect: {
            prev: {
              translate: [0, 0, -900],
            },
            next: {
              translate:
                direction === 'horizontal'
                  ? ['100%', 0, 0] // horizontal → right
                  : [0, '100%', 0], // vertical → down
            },
          },
        },
      };
    case 'rotate':
      return {
        effect: 'creative',
        modules: [EffectCreative],
        effectOptions: {
          creativeEffect: {
            prev: {
              shadow: true,
              rotate: direction === 'horizontal' ? [0, 0, -180] : [0, 0, -180],
              translate:
                direction === 'horizontal'
                  ? ['-125%', 0, -900]
                  : [0, '-125%', -900],
            },

            next: {
              shadow: false,
              translate:
                direction === 'horizontal'
                  ? ['125%', 0, -900]
                  : [0, '125%', -900],
              rotate: direction === 'horizontal' ? [0, 0, 180] : [0, 0, -180],
            },
          },
        },
      };
    case 'zoom':
      return {
        effect: 'creative',
        modules: [EffectCreative],
        effectOptions: {
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, 0],
              scale: 0.3,
            },
            next: {
              shadow: true,
              translate: [0, 0, 0],
              scale: 0.4,
            },
            scale: 1,
            limitProgress: 2, // allow zoom beyond 1
          },
        },
      };
    default:
      return {effect: 'slide', modules: [], effectOptions: {}};
  }
};
