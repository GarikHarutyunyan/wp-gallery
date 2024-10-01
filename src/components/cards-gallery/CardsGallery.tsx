import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {ICardsSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectCards, Navigation} from 'swiper/modules';
import './cards-gallery.css';
import {getWidthAllCards} from './getWidthAllCards';
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

  let allCardswidth =
    2 * (getWidthAllCards(width, height, perSlideOffset) - width / 2);

  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    allCardswidth >= wrapper?.clientWidth ? width * 0.8 : width
  );
  const ratio: number = innerWidth / height;
  const containerWidth: number = innerWidth;
  const containerHeight: number = containerWidth / ratio;

  useEffect(() => {
    allCardswidth =
      2 * (getWidthAllCards(innerWidth, height, perSlideOffset) - width / 2);
    const handleResize = () => {
      console.log(allCardswidth, wrapper.clientWidth);
      setInnerWidth(
        allCardswidth >= wrapper?.clientWidth ? width * 0.8 : width
      );
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth, allCardswidth, width]);

  const handleCardsSlideChange = (swiperRef: any) => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.realIndex;

    const loadImagesInRange = (startIndex: number, endIndex: number) => {
      for (let i = startIndex; i <= endIndex; i++) {
        const imgElement = document.querySelector(
          `.lazy[data-index="${i}"]`
        ) as HTMLImageElement;

        if (
          imgElement &&
          images &&
          (!imgElement.src || imgElement.src === undefined)
        ) {
          imgElement.setAttribute('src', images[i].original.url);
          imgElement.setAttribute(
            'srcSet',
            `${images[i].thumbnail.url} ${images[i].thumbnail.width}w, ${images[i].medium_large.url} ${images[i].medium_large.width}w, ${images[i].original.url} ${images[i].original.width}w`
          );
        }
      }
    };

    const loadStartIndex = activeIndex;
    const loadEndIndex = activeIndex + 4;

    loadImagesInRange(loadStartIndex, loadEndIndex);
  };

  return (
    <>
      <Box
        sx={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
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
          handleCardsSlideChange={handleCardsSlideChange}
          perSlideOffset={perSlideOffset}
        />
      </Box>
      <div></div>
    </>
  );
};

export {CardsGallery};
