import Box from '@mui/material/Box';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {ICardsSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectCards, Navigation} from 'swiper/modules';
import './cards-gallery.css';
import {getContainerWidth, getMargin} from './getWidthAllCards';
interface ITCardsProps {
  onClick?: (index: number) => void;
}

const CardsGallery: React.FC<ITCardsProps> = ({onClick}) => {
  const {images} = useData();
  const {cardsSettings: settings, wrapperRef} = useSettings();
  const {
    autoplay,
    slideDuration,
    playAndPauseAllowed,
    width,
    height,
    navigationButton,
    perSlideOffset,
  } = settings as ICardsSettings;

  const effects = {
    id: 3,
    effect: 'cards',
    modules: [EffectCards, Autoplay, Navigation],
    navigation: navigationButton,
    cardsEffect: {
      rotate: true,
      perSlideRotate: 5,
    },
  };

  const wrapper = wrapperRef.current;

  const ratio = width / height;
  let initialWidth = width;
  let initialHeight = height;

  while (
    getContainerWidth(initialWidth, initialHeight, perSlideOffset) >=
    wrapper?.clientWidth
  ) {
    initialWidth = initialWidth - 1;
    initialHeight = initialWidth / ratio;
  }

  const [innerWidth, setInnerWidth] = useState<number>(initialWidth);
  const [innerHeight, setInnerHeight] = useState<number>(initialHeight);
  const {marginTop, marginBottom} = getMargin(initialWidth, initialHeight);

  useEffect(() => {
    const handleResize = () => {
      initialWidth = width;
      initialHeight = height;
      while (
        getContainerWidth(initialWidth, initialHeight, perSlideOffset) >=
        wrapper?.clientWidth
      ) {
        initialWidth = initialWidth - 1;
        initialHeight = initialWidth / ratio;
      }
      setInnerWidth(initialWidth);
      setInnerHeight(initialHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, perSlideOffset]);

  return (
    <Box
      sx={{
        width: `${innerWidth}px`,
        height: `${innerHeight}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        mx: 'auto',
      }}
    >
      <SwiperGallery
        key={effects.id}
        effects={effects}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
        playAndPauseAllowed={playAndPauseAllowed}
        size={Math.max(innerWidth, innerHeight)}
        imagesCount={5}
        preLoadCount={9}
        allowTouchMove={true}
        perSlideOffset={perSlideOffset}
        onClick={onClick}
      />
    </Box>
  );
};

export {CardsGallery};
export default CardsGallery;
