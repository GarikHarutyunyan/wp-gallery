import {useSettings} from 'components/settings';
import {ICardsSettings, ICarouselSettings} from 'data-structures';
import {useEffect, useState} from 'react';
const useConfigureSwiper = (swiperRef: any, key: string): void => {
  const {carouselSettings: settings} = useSettings();
  const {cardsSettings: settings1} = useSettings();
  const {perSlideOffset} = settings1 as ICardsSettings;
  const {scale, width, height} = settings as ICarouselSettings;

  const [upDate, setUpdate] = useState(0);

  useEffect(() => {
    let swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params[key].scale = scale;
      swiper.params[key].depth = scale > 1 ? -1 : 1;
      const activerSwiper = document.querySelector('.swiper') as HTMLElement;
    } else if (key === 'cardsEffect') {
      swiper.params[key].perSlideOffset = perSlideOffset;
      setUpdate(upDate + 1);
    }
    swiper.update();
  }, [scale, perSlideOffset]);
};

export default useConfigureSwiper;
