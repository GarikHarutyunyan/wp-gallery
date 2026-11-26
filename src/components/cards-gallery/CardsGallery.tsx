import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {useSwiperTitleCaptionHeight} from 'components/swiper-gallery/useSwiperTitleCaptionHeight';
import {
  ICardsSettings,
  SliderNavigation,
  SliderNavigationPosition,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import {EffectCards} from 'swiper/modules';
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
    perSlideOffset,
    showTitle,
    showCaption,
    showDescription,
    showButton,
    titlePosition,
    captionPosition,
    descriptionPosition,
    buttonPosition,
    titleFontSize,
    captionFontSize,
    descriptionFontSize,
    buttonFontSize,
    navigation,
    dotsPosition,
    dotsSize,
    dotsGap,
    activeDotColor,
    inactiveDotsColor,
  } = settings as ICardsSettings;

  const effects = {
    id: 3,
    effect: 'cards',
    additionalModules: [EffectCards],
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

  const galleryRef = useRef<HTMLDivElement>(null);
  const titleCaptionHeight = useSwiperTitleCaptionHeight(galleryRef, [
    settings,
    images,
  ]);

  const dynamicThreshold = 6;

  const externalPaginationIdRef = React.useRef(
    `swiper-pagination-external-${Math.random().toString(36).slice(2, 9)}`
  );

  return (
    <>
      <Box
        ref={galleryRef}
        sx={{
          width: `${innerWidth}px`,
          height: `${innerHeight + titleCaptionHeight}px`,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          mx: 'auto',
        }}
      >
        <SwiperGallery
          key={effects.id}
          externalPaginationId={externalPaginationIdRef.current}
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
          settings={settings as ICardsSettings}
          titleCaptionHeight={titleCaptionHeight}
          onClick={onClick}
        />
      </Box>
      {(navigation === SliderNavigation.DOTS ||
        navigation === SliderNavigation.ARROWS_AND_DOTS) &&
        dotsPosition === SliderNavigationPosition.OUTSIDE && (
          <div
            id={externalPaginationIdRef.current}
            className={clsx(
              'swiper-pagination-external',
              'swiper-pagination',
              'swiper-pagination-clickable',
              'swiper-pagination-bullets',
              'swiper-pagination-horizontal',
              {
                'swiper-pagination-bullets-dynamic':
                  (images || []).length > dynamicThreshold,
              }
            )}
            style={{
              ['--swiper-pagination-color' as string]: activeDotColor,
              ['--swiper-pagination-bullet-size' as string]: dotsSize + 'px',
              ['--swiper-pagination-bullet-inactive-color' as string]:
                inactiveDotsColor,
              ['--swiper-pagination-bullet-inactive-opacity' as string]: '1',
              ['--swiper-pagination-bullet-horizontal-gap' as string]:
                dotsGap + 'px',
              ['--swiper-external-pagination-padding' as string]: '10px',
              ['--swiper-external-pagination-bottom-padding' as string]: '10px',
            }}
          />
        )}
    </>
  );
};

export {CardsGallery};
export default CardsGallery;
