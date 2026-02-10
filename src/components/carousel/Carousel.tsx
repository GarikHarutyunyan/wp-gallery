import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {
  ICarouselSettings,
  SliderNavigation,
  SliderNavigationPosition,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import {EffectCoverflow} from 'swiper/modules';
import {SwiperGallery} from '../swiper-gallery/SwiperGallery';
import './carousel.css';

interface ITCarouselProps {
  onClick?: (index: number) => void;
}

const Carousel: React.FC<ITCarouselProps> = ({onClick}) => {
  const {images = []} = useData();
  const {carouselSettings: settings, wrapperRef} = useSettings();
  const {
    backgroundColor,
    padding,
    autoplay,
    slideDuration,
    playAndPauseAllowed,
    width,
    height,
    imagesCount,
    spaceBetween,
    scale,
    showTitle,
    showCaption,
    titlePosition,
    captionPosition,
    titleFontSize,
    captionFontSize,
    navigation,
    dotsPosition,
    dotsSize,
    dotsGap,
    activeDotColor,
    inactiveDotsColor,
  } = settings as ICarouselSettings;

  const effects = {
    id: 1,
    spaceBetween: spaceBetween,
    slidesPerView: imagesCount,
    centeredSlides: false,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      depth: 1,
      modifier: 0.1,
      scale: scale,
      slideShadows: false,
      stretch: 0,
    },
    additionalModules: [EffectCoverflow],
  };

  const wrapper = wrapperRef.current;
  // Count the container width depends on main image width, images count and space between images.
  const contWidth =
    imagesCount * (width + ((imagesCount - 1) * spaceBetween) / imagesCount);
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || contWidth
  );
  const ratio: number = contWidth / height;
  const containerWidth: number = Math.min(innerWidth, contWidth);
  const containerHeight: number =
    innerWidth >= 480 ? containerWidth / ratio : height;
  // This ensures that Swiper functions correctly in infinite loop mode and disabled pagination when the total number of images is less than the number of visible slides
  const shouldDuplicate =
    navigation === SliderNavigation.DOTS ||
    navigation === SliderNavigation.ARROWS_AND_DOTS
      ? false
      : images.length > 1 && imagesCount * 2 > images.length;

  const carouselImages = shouldDuplicate ? [...images, ...images] : images;

  const [titleCaptionHeight, setTitleCaptionHeight] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!galleryRef.current) return;

    const measureTitleCaptionHeight = () => {
      const title = galleryRef.current?.querySelector(
        '.swiper-gallery__title-caption.swiper-gallery__item-outline'
      ) as HTMLElement;
      const caption = galleryRef.current?.querySelector(
        '.swiper-gallery__caption.swiper-gallery__item-outline'
      ) as HTMLElement;

      let totalHeight = 0;
      if (title) totalHeight += title.offsetHeight;
      if (caption) totalHeight += caption.offsetHeight;

      setTitleCaptionHeight(totalHeight);
    };

    // Initial measurement
    measureTitleCaptionHeight();

    // Watch for changes using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      measureTitleCaptionHeight();
    });

    const swiperSlide = galleryRef.current.querySelector(
      '.swiper-slide'
    ) as HTMLElement;
    if (swiperSlide) {
      resizeObserver.observe(swiperSlide);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    showTitle,
    showCaption,
    titlePosition,
    captionPosition,
    titleFontSize,
    captionFontSize,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth || contWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

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
          background: backgroundColor,
          padding: `${padding}px`,
          paddingBottom:
            (navigation === SliderNavigation.DOTS ||
              navigation === SliderNavigation.ARROWS_AND_DOTS) &&
            dotsPosition === SliderNavigationPosition.OUTSIDE
              ? 0
              : `${padding}px`,
          boxSizing: 'border-box',
        }}
      >
        {(images || []).length > 0 && (
          <SwiperGallery
            key={effects.id}
            externalPaginationId={externalPaginationIdRef.current}
            effects={effects}
            loop={images.length > 1}
            backgroundColor={backgroundColor}
            images={carouselImages}
            autoplay={autoplay}
            delay={slideDuration}
            playAndPauseAllowed={playAndPauseAllowed}
            width={containerWidth}
            height={containerHeight + titleCaptionHeight}
            size={Math.max(width, height)}
            imagesCount={imagesCount}
            preLoadCount={imagesCount + 2}
            padding={padding}
            scale={scale}
            allowTouchMove={true}
            onClick={onClick}
            slideClassName={clsx({carousel__slide_clickable: !!onClick})}
            settings={settings as ICarouselSettings}
            breakpoints={{
              // when window width is >= 0
              0: {
                slidesPerView: imagesCount > 1 ? 1 : imagesCount,
                spaceBetween: spaceBetween < 0 ? spaceBetween : 0,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: imagesCount > 2 ? 2 : imagesCount,
                spaceBetween: spaceBetween < 20 ? spaceBetween : 20,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: imagesCount > 3 ? 3 : imagesCount,
                spaceBetween: spaceBetween < 30 ? spaceBetween : 30,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: imagesCount > 4 ? 4 : imagesCount,
                spaceBetween: spaceBetween < 40 ? spaceBetween : 40,
              },
              // when window width is >= 1280px
              1280: {
                slidesPerView: imagesCount,
                spaceBetween: spaceBetween,
              },
            }}
            titleCaptionHeight={titleCaptionHeight}
          />
        )}
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
              ['--swiper-external-pagination-bottom-padding' as string]: padding
                ? padding + 'px'
                : 'var(--swiper-external-pagination-padding)',
              width: `${containerWidth}px`,
              background: backgroundColor,
              margin: (images || []).length > dynamicThreshold ? 0 : '0 auto',
            }}
          />
        )}
    </>
  );
};

export {Carousel};
export default Carousel;
