import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import {useEffect, useState} from 'react';
const useConfigureSwiper = (swiperRef: any, key: string): void => {
  const {carouselSettings: settings} = useSettings();

  const {scale, width, height} = settings as ICarouselSettings;

  const [upDate, setUpdate] = useState(0);

  useEffect(() => {
    let swiper = swiperRef.current?.swiper;
    if (key === 'coverflowEffect') {
      swiper.params[key].scale = scale;
      swiper.params[key].depth = scale > 1 ? -1 : 1;
      const activerSwiper = document.querySelector('.swiper') as HTMLElement;
    } else if (key === 'cardsEffect') {
      setUpdate(upDate + 1);
    }
    swiper.update();
  }, [scale]);
};

export default useConfigureSwiper;
