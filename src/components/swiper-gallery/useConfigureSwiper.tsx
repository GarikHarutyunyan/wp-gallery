import {useSettings} from 'components/settings';
import {ICardsSettings, ICarouselSettings} from 'data-structures';
import {useLayoutEffect, useState} from 'react';
const useConfigureSwiper = (swiperRef: any, key: string): void => {
  const {carouselSettings: settings} = useSettings();
  const {cardsSettings: settingsCards} = useSettings();
  const {scale} = settings as ICarouselSettings;
  const {perSlideOffset} = settingsCards as ICardsSettings;
  const [upDate, setUpdate] = useState(0);

  useLayoutEffect(() => {
    let swiper = swiperRef.current?.swiper;

    if (key === 'cardsEffect') {
      swiper.params.cardsEffect.perSlideOffset = perSlideOffset;
      swiper.update();
    }
  }, [scale, perSlideOffset]);
};

export default useConfigureSwiper;
