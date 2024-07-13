import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import {useEffect, useState} from 'react';

const useConfigureSwiper = (swiperRef: any, key: string): void => {
  const {carouselSettings: settings} = useSettings();
  const {
    slidesDepth,
    rotate,
    modifier,
    scale,
    stretch,
    shadow,
    shadowOpacity,
    rotateCard,
    perSlideOffset,
    shadowOffset,
  } = settings as ICarouselSettings;

  const [upDate, setUpdate] = useState(0);
  useEffect(() => {
    let swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params[key].depth = slidesDepth;
      swiper.params[key].modifier = modifier;
      swiper.params[key].rotate = rotate;
      swiper.params[key].scale = scale;
      swiper.params[key].stretch = stretch;
    } else if (key === 'cardsEffect') {
      swiper.params[key].rotate = rotateCard;
      swiper.params[key].perSlideOffset = perSlideOffset;
      setUpdate(upDate + 1);
      console.log('yey');
    } else if (key === 'cubeEffect') {
      const cubeShadow = document.querySelector(
        '.swiper-cube .swiper-cube-shadow'
      ) as HTMLElement;

      cubeShadow.style.width = shadow ? '100%' : '0%';
      cubeShadow.style.opacity = shadowOpacity / 10 + '';
    }

    if (swiper.params) console.log(swiper);
  }, [
    slidesDepth,
    modifier,
    rotate,
    scale,
    stretch,
    rotateCard,
    perSlideOffset,
    shadowOpacity,
    shadowOffset,
    shadow,
  ]);
};

export default useConfigureSwiper;
