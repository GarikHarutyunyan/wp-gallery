import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICardsSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {SwiperGallery} from '../SwiperGallery';
type EffectTypes = 'coverflow' | 'cards' | 'creative';

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

  const selectedEffect = {
    id: 2,
    effect: 'cards',
    modules: [Autoplay, Navigation, Pagination],
    navigation: true,
    cardsEffect: {
      rotate: true,
      perSlideOffset: 81,
      perSlideRotate: 21,
    },
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,
  };
  const imagesCount = 1;
  const wrapper = wrapperRef.current;
  const contWidth = width;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || contWidth
  );
  const ratio: number = contWidth / height;
  const containerWidth: number = Math.min(innerWidth, contWidth);
  const containerHeight: number = containerWidth / ratio;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth || contWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  const handleThumbnailClick = (index: number, swiperRef: any) => {
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  const handleSlideChange = (previusIndex: any, swiperRef: any) => {
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

    if (
      activeIndex > previusIndex.current &&
      previusIndex.current !== -1 &&
      images
    ) {
      const loadStartIndex = activeIndex;
      const loadEndIndex = Math.min(
        imagesCount + activeIndex + 4,
        images.length
      );
      loadImagesInRange(loadStartIndex, loadEndIndex);
    } else if (previusIndex.current !== -1) {
      const loadStartIndex = activeIndex
        ? Math.max(
            activeIndex - (imagesCount !== undefined ? imagesCount : 0) - 4,
            0
          )
        : 0;
      const loadEndIndex = activeIndex;
      loadImagesInRange(loadStartIndex, loadEndIndex);
    }
    previusIndex.current = activeIndex;
  };

  return (
    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        mx: 'auto',
      }}
    >
      <SwiperGallery
        effects={selectedEffect}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
        playAndPouseAllowed={playAndPouseAllowed}
        width={containerWidth}
        height={containerHeight}
        imagesCount={imagesCount}
        handleThumbnailClick={handleThumbnailClick}
        handleSlideChange={handleSlideChange}
      />
    </Box>
  );
};

export {CardsGallery};
