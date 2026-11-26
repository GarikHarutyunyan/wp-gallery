import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {useSwiperTitleCaptionHeight} from 'components/swiper-gallery/useSwiperTitleCaptionHeight';
import {
  ICubeSettings,
  SliderNavigation,
  SliderNavigationPosition,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import {EffectCube} from 'swiper/modules';
import './cube-gallery.css';

const effects = {
  id: 2,
  effect: 'cube',
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  additionalModules: [EffectCube],
};

interface ICubeGalleryProps {
  onClick?: (index: number) => void;
}

const CubeGallery = ({onClick}: ICubeGalleryProps) => {
  const {images} = useData();
  const {cubeSettings: settings, wrapperRef} = useSettings();
  const {
    width,
    height,
    isInfinite,
    backgroundColor,
    padding,
    autoplay,
    slideDuration,
    shadow,
    showTitle,
    showCaption,
    showDescription,
    showButton,
    titlePosition,
    captionPosition,
    descriptionPosition,
    buttonPosition,
    titleFontSize,
    playAndPauseAllowed,
    captionFontSize,
    descriptionFontSize,
    buttonFontSize,
    buttonBorderSize,
    navigation,
    dotsPosition,
    dotsSize,
    dotsGap,
    activeDotColor,
    inactiveDotsColor,
  } = settings as ICubeSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth * 0.8 || width
  );
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = containerWidth / ratio;

  const galleryRef = useRef<HTMLDivElement>(null);
  const titleCaptionHeight = useSwiperTitleCaptionHeight(galleryRef, [
    settings,
    images,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth * 0.8 || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const cubeShadow = galleryRef.current.querySelector(
      '.swiper-cube .swiper-cube-shadow'
    );

    if (cubeShadow) {
      (cubeShadow as HTMLElement).style.width = shadow ? '100%' : '0%';
    }
  }, [shadow]);

  const dynamicThreshold = 6;

  const externalPaginationIdRef = React.useRef(
    `swiper-pagination-external-${Math.random().toString(36).slice(2, 9)}`
  );

  return (
    <>
      <Box
        ref={galleryRef}
        sx={{
          width: `${containerWidth}px`,
          height: `${containerHeight + titleCaptionHeight}px`,
          mx: 'auto',
        }}
      >
        <SwiperGallery
          key={+isInfinite}
          externalPaginationId={externalPaginationIdRef.current}
          effects={effects}
          loop={isInfinite}
          playAndPauseAllowed={playAndPauseAllowed}
          backgroundColor={backgroundColor || 'White'}
          padding={padding}
          images={images || []}
          autoplay={autoplay}
          delay={slideDuration}
          size={Math.max(containerWidth, containerHeight)}
          imagesCount={1}
          preLoadCount={4}
          allowTouchMove={true}
          settings={settings as ICubeSettings}
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

export {CubeGallery};
export default CubeGallery;
