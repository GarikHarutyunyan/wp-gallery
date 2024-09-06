import {useSettings} from 'components/settings';
import {ICardsSettings, ICarouselSettings} from 'data-structures';
import {useEffect, useState} from 'react';
const useConfigureSwiper = (swiperRef: any, key: string): void => {
  const {carouselSettings: settings} = useSettings();
  const {cardsSettings: settingsCards} = useSettings();
  const {scale} = settings as ICarouselSettings;
  const {perSlideOffset} = settingsCards as ICardsSettings;
  const [upDate, setUpdate] = useState(0);

  useEffect(() => {
    let swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params[key].scale = scale;
      swiper.params[key].depth = scale > 1 ? -1 : 1;
      const activerSwiper = document.querySelector('.swiper') as HTMLElement;
    } else if (key === 'cardsEffect') {
      swiper.params.cardsEffect.perSlideOffset = perSlideOffset;
      swiper.update();
    }
    swiper.update();
  }, [scale, perSlideOffset]);
};

export default useConfigureSwiper;
