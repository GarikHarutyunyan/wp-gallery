import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ISliderSettings, SliderTextPosition} from 'data-structures';
import {useEffect, useMemo, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/thumbs';

import React from 'react';
import {useObservedTextHeight} from './hooks/useObservedTextHeight';
import './slider.css';
import SliderMain from './SliderMain';
import {SliderNavigation} from './SliderNavigation';
import SliderThumbs from './SliderThumbs';
import {getPaginationCSSVars} from './utils/getPaginationCSSVars';
import {
  getThumbnailsFlexDirection,
  hasThumbnails,
  isThumbnailsVertical,
} from './utils/getThumbnailsPosition';
interface ISliderProps {
  onClick?: (index: number) => void;
}

const Slider: React.FC<ISliderProps> = ({onClick}) => {
  const {images = []} = useData();
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const {sliderSettings: settings} = useSettings();
  const {
    width,
    widthType,
    isInfinite,
    imageAnimation,
    thumbnailsPosition,
    thumbnailShowsOnHover,
    backgroundColor,
    textPosition,
    showTitle,
    showDescription,
    showCaption,
    navigationButton,
    navigationPosition,
    paginationType,
    paginationshowsOnHover,
    paginationBulletsImage,
    thumbnailBarGap,
    direction,
    keyboard,
    mousewheel,
    shadow,
    shadowType,
    shadowColor,
    paginationPosition,
    pagination,
  } = settings as ISliderSettings;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const thumbsVertical = isThumbnailsVertical(thumbnailsPosition);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasThumbs = hasThumbnails(thumbnailsPosition);
  const hasTextAbove =
    (showTitle || showDescription || showCaption) &&
    textPosition === SliderTextPosition.ABOVE;

  const hasTextBelow =
    (showTitle || showDescription || showCaption) &&
    textPosition === SliderTextPosition.BELOW;
  const observedTextHeight = useObservedTextHeight(
    textRef,
    showTitle,
    showDescription,
    showCaption,
    textPosition
  );
  const textHeight = hasTextBelow || hasTextAbove ? observedTextHeight : 0;

  useEffect(() => {
    hasThumbs && setThumbsSwiper(null);
  }, [
    direction,
    isInfinite,
    imageAnimation,
    hasThumbs,
    keyboard,
    mousewheel,
    paginationType,
    paginationBulletsImage,
    paginationPosition,
  ]);
  const staticKey = useMemo(
    () =>
      `${direction}-${isInfinite}-${hasThumbs}-${imageAnimation}-${keyboard}-${mousewheel}-${paginationType}-${paginationBulletsImage}-${paginationPosition}`,
    [
      direction,
      isInfinite,
      imageAnimation,
      hasThumbs,
      keyboard,
      mousewheel,
      paginationType,
      paginationBulletsImage,
      paginationPosition,
    ]
  );
  return (
    <Box className="slider">
      {/* Inner Box (flex container for slider + thumbnails) */}
      <div
        className={clsx('slider__layout', {
          'slider__layout--pagination-hover': paginationshowsOnHover,
          'slider__layout--thumbnail-hover': thumbnailShowsOnHover,
        })}
        style={{
          width: `${width}${widthType}`,
        }}
      >
        {navigationButton && navigationPosition.includes('out-top') && (
          <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
        )}
        <div
          className={clsx('slider__main-swiper--wrapper', {
            [`slider__shadow--${shadowType}`]: shadow,
          })}
          style={{
            display: 'flex',
            flexDirection: getThumbnailsFlexDirection(thumbnailsPosition),
            gap: thumbnailBarGap,
            backgroundColor: backgroundColor || 'transparent',
            ...(shadow && shadowColor
              ? ({'--slider-shadow-color': shadowColor} as React.CSSProperties)
              : {}),
          }}
        >
          <SliderMain
            key={`main-${staticKey}`}
            images={images}
            settings={settings!}
            thumbsSwiper={thumbsSwiper}
            mainSwiperRef={mainSwiperRef}
            textRef={textRef}
            textHeight={textHeight}
            hasTextAbove={hasTextAbove}
            hasTextBelow={hasTextBelow}
            hasThumbs={hasThumbs}
            thumbsVertical={thumbsVertical}
            onClick={onClick}
            paginationRef
          />
          {hasThumbs && (
            <SliderThumbs
              key={`thumbs-${staticKey}`}
              images={images}
              direction={thumbsVertical ? 'vertical' : 'horizontal'}
              settings={settings!}
              setThumbsSwiper={setThumbsSwiper}
              textHeight={textHeight}
            />
          )}
        </div>
        {/* THUMBNAILS (SEPARATE COMPONENT) */}

        {navigationButton && navigationPosition.includes('out-bottom') && (
          <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
        )}
        {pagination && paginationPosition.includes('out') && (
          <div
            key={`pagination-${paginationType}-${images.length}`}
            style={
              {
                ...getPaginationCSSVars(settings!),
              } as React.CSSProperties
            }
            className="slider__pagination-external slider-pagination"
          ></div>
        )}
      </div>
    </Box>
  );
};

export {Slider};
export default Slider;
