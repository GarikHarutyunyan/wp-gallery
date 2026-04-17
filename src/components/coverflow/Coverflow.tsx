import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {
  ICoverflowSettings,
  SliderNavigation,
  SliderNavigationPosition,
} from 'data-structures';
import React, {useEffect, useRef, useState} from 'react';
import {EffectCoverflow} from 'swiper/modules';
import '../carousel/carousel.css';
import {SwiperGallery} from '../swiper-gallery/SwiperGallery';

interface ITCoverflowProps {
  onClick?: (index: number) => void;
}

const Coverflow: React.FC<ITCoverflowProps> = ({onClick}) => {
  const {images = []} = useData();
  const {coverflowSettings: settings, wrapperRef} = useSettings();
  const {
    backgroundColor,
    padding,
    autoplay,
    slideDuration,
    playAndPauseAllowed,
    width,
    height,
    imagesCount,
    rotate = 50,
    showTitle,
    showCaption,
    showButton,
    titlePosition,
    captionPosition,
    buttonPosition,
    titleFontSize,
    captionFontSize,
    buttonFontSize,
    navigation,
    dotsPosition,
    dotsSize,
    dotsGap,
    activeDotColor,
    inactiveDotsColor,
  } = settings as ICoverflowSettings;

  const coverflowScale = 0.9;
  const coverflowSpaceBetween = 0;
  const normalizedImagesCount = Number(imagesCount) >= 4 ? 4 : 3;

  const effects = {
    id: 2,
    spaceBetween: coverflowSpaceBetween,
    slidesPerView: normalizedImagesCount,
    slidesPerGroup: 1,
    centeredSlides: false,
    effect: 'coverflow',
    coverflowEffect: {
      rotate,
      depth: 100,
      modifier: 1,
      scale: coverflowScale,
      stretch: 0,
    },
    additionalModules: [EffectCoverflow],
  };

  const wrapper = wrapperRef.current;
  const contWidth = normalizedImagesCount * width;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth || contWidth
  );
  const ratio: number = contWidth / height;
  const imageRatio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, contWidth);
  const containerHeight: number =
    innerWidth >= 480 ? containerWidth / ratio : height;
  const imageCorrectWidth =
    (containerWidth -
      (normalizedImagesCount - 1) * coverflowSpaceBetween -
      2 * padding) /
    normalizedImagesCount;
  const imageCorrectHeight = Math.floor(imageCorrectWidth / imageRatio);
  const imageRequestSize: number = Math.floor(
    Math.max(imageCorrectHeight, imageCorrectWidth)
  );

  const shouldDuplicate =
    navigation === SliderNavigation.DOTS ||
    navigation === SliderNavigation.ARROWS_AND_DOTS
      ? false
      : images.length > 1 && normalizedImagesCount * 2 > images.length;

  const coverflowImages = shouldDuplicate ? [...images, ...images] : images;

  const [titleCaptionHeight, setTitleCaptionHeight] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const measureTitleCaptionHeight = () => {
      const title = galleryRef.current?.querySelector(
        '.swiper-gallery__title-caption.swiper-gallery__item-outline:not(.swiper-gallery__button)'
      ) as HTMLElement;
      const caption = galleryRef.current?.querySelector(
        '.swiper-gallery__caption.swiper-gallery__item-outline'
      ) as HTMLElement;
      const button = galleryRef.current?.querySelector(
        '.swiper-gallery__button.swiper-gallery__item-outline'
      ) as HTMLElement;

      let totalHeight = 0;
      if (title) totalHeight += title.offsetHeight;
      if (caption) totalHeight += caption.offsetHeight;
      if (button) totalHeight += button.offsetHeight;

      setTitleCaptionHeight(totalHeight);
    };

    measureTitleCaptionHeight();

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
    showButton,
    titlePosition,
    captionPosition,
    buttonPosition,
    titleFontSize,
    captionFontSize,
    buttonFontSize,
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
            images={coverflowImages}
            autoplay={autoplay}
            delay={slideDuration}
            playAndPauseAllowed={playAndPauseAllowed}
            width={containerWidth}
            height={containerHeight + titleCaptionHeight}
            size={imageRequestSize}
            imagesCount={normalizedImagesCount}
            preLoadCount={imagesCount + 2}
            padding={padding}
            scale={coverflowScale}
            allowTouchMove={true}
            onClick={onClick}
            slideClassName={clsx({carousel__slide_clickable: !!onClick})}
            settings={settings as ICoverflowSettings}
            breakpoints={{
              0: {
                slidesPerView:
                  normalizedImagesCount > 1 ? 1 : normalizedImagesCount,
                spaceBetween: coverflowSpaceBetween,
              },
              480: {
                slidesPerView:
                  normalizedImagesCount > 2 ? 2 : normalizedImagesCount,
                spaceBetween: coverflowSpaceBetween,
              },
              640: {
                slidesPerView:
                  normalizedImagesCount > 3 ? 3 : normalizedImagesCount,
                spaceBetween: coverflowSpaceBetween,
              },
              1024: {
                slidesPerView:
                  normalizedImagesCount > 4 ? 4 : normalizedImagesCount,
                spaceBetween: coverflowSpaceBetween,
              },
              1280: {
                slidesPerView: normalizedImagesCount,
                spaceBetween: coverflowSpaceBetween,
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

export {Coverflow};
export default Coverflow;
