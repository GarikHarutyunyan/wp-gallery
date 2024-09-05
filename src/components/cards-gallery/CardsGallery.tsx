import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {ICardsSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectCards, Navigation} from 'swiper/modules';
const effects = {
  id: 3,
  effect: 'cards',
  modules: [EffectCards, Autoplay, Navigation],
  navigation: true,
  cardsEffect: {
    rotate: true,
    perSlideOffset: 11,
    perSlideRotate: 10,
  },
};
interface ITCardsProps {
  onClick?: (index: number) => void;
}

const CardsGallery: React.FC<ITCardsProps> = ({onClick}) => {
  const {images} = useData();
  const {cardsSettings: settings, wrapperRef} = useSettings();
  const {
    autoplay,
    slideDuration,
    playAndPouseAllowed,
    width,
    height,
    perSlideOffset,
    navigationButton,
  } = settings as ICardsSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth * 0.8 || width
  );
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = containerWidth / ratio;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth * 0.8 || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <SwiperGallery
        key={effects.effect}
        effects={effects}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
      />
    </Box>
  );
};

export {CardsGallery};
