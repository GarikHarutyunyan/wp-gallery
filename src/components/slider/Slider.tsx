import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {IImageDTO, ISliderSettings, SliderTextPosition} from 'data-structures';
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
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Thumbs,
} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

import {useObservedTextHeight} from './hooks/useObservedTextHeight';
import './slider.css';
import {SliderNavigation} from './SliderNavigation';
import {SliderSlideContent} from './SliderSlideContent';
import SliderThumbs from './SliderThumbs';
import {SlideText} from './SlideText';
import {getSwiperEffectOptions} from './utils/swiperEffects';
import {
  getThumbnailsFlexDirection,
  hasThumbnails,
  isThumbnailsVertical,
} from './utils/thumbnailsPosition';

interface ISliderProps {
  onClick?: (index: number) => void;
}

const Slider: React.FC<ISliderProps> = ({onClick}) => {
  const {images = []} = useData();
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const {sliderSettings: settings} = useSettings();
  const {
    width,
    height,
    isInfinite,
    isSliderAllowed,
    autoplay,
    slideDuration,
    slideDelay,
    imageAnimation,
    thumbnailsPosition,
    thumbnailPadding,
    backgroundColor,
    textPosition,
    showTitle,
    showDescription,
    showCaption,
    navigationButton,
    navigationPosition,
    pagination,
    paginationPosition,
    paginationDynamicBullets,
    paginationshowsOnHover,
    paginationBulletsBackgroundColor,
    paginationBulletsSize,
    paginationBulletsBorder,
    paginationBulletsBorderRadius,
    paginationBulletsBorderColor,
    paginationBulletsImage,
    paginationActiveBulletBackgroundColor,
    paginationActiveBulletSize,
    paginationActiveBulletBorder,
    paginationActiveBulletBorderColor,
    paginationActiveBulletBorderRadius,
    direction,
    keyboard,
    mousewheel,
  } = settings as ISliderSettings;
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  console.log(images);
  const thumbsVertical = isThumbnailsVertical(thumbnailsPosition);
  const {
    effect,
    modules: effectModules,
    effectOptions,
  } = getSwiperEffectOptions(imageAnimation, direction);
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
    showCaption
  );
  const textHeight = hasTextBelow || hasTextAbove ? observedTextHeight : 0;

  const handlePlay = () => {
    const swiper = mainSwiperRef.current;
    if (swiper?.autoplay) {
      // ✅ check for object, not call it
      swiper.autoplay.start(); // ✅ start autoplay
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = mainSwiperRef.current;
    if (swiper?.autoplay) {
      swiper.autoplay.stop(); // ✅ stop autoplay
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    const swiper = mainSwiperRef.current;
    if (swiper?.autoplay) {
      if (autoplay) {
        swiper.autoplay.start();
        setIsPlaying(true);
      } else {
        swiper.autoplay.stop();
        setIsPlaying(false);
      }
    }
  }, [autoplay, isSliderAllowed]);

  useEffect(() => {
    hasThumbs && setThumbsSwiper(null);
  }, [
    direction,
    isInfinite,
    imageAnimation,
    hasThumbs,
    keyboard,
    mousewheel,
    paginationDynamicBullets,
    paginationBulletsImage,
  ]);
  const staticKey = useMemo(
    () =>
      `${direction}-${isInfinite}-${hasThumbs}-${imageAnimation}-${keyboard}-${mousewheel}-${paginationDynamicBullets}-${paginationBulletsImage}`,
    [
      direction,
      isInfinite,
      imageAnimation,
      hasThumbs,
      keyboard,
      mousewheel,
      paginationDynamicBullets,
      paginationBulletsImage,
    ]
  );
  return (
    <Box className="slider">
      {/* Inner Box (flex container for slider + thumbnails) */}
      <div
        className={clsx('slider__layout', {
          'slider__layout--pagination-hover': paginationshowsOnHover,
        })}
        style={{
          flexDirection: getThumbnailsFlexDirection(thumbnailsPosition),
          gap: thumbnailPadding,
          backgroundColor: backgroundColor || 'transparent',
        }}
      >
        <div className="slider__main-swiper--wrapper">
          {navigationButton && navigationPosition.includes('out-top') && (
            <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
          )}
          <Swiper
            key={`main-${staticKey}`}
            onSwiper={(swiper: any) => (mainSwiperRef.current = swiper)}
            style={
              {
                width,
                'height': direction === 'vertical' ? height + textHeight : '',
                // '--swiper-navigation-top-offset': 'calc(50% - 49px)',

                /* ───────────── NORMAL BULLETS ───────────── */
                '--slider-pagination-bullet-bg':
                  paginationBulletsBackgroundColor || '#aeb0b1',
                '--slider-pagination-bullet-size': `${
                  paginationBulletsSize || 21
                }px`,

                '--slider-pagination-bullet-border': `${
                  paginationBulletsBorder || 0
                }px`,
                '--slider-pagination-bullet-border-radius': `${paginationBulletsBorderRadius}px`,
                '--slider-pagination-bullet-border-color':
                  paginationBulletsBorderColor || '#ffffff',
                /* ───────────── ACTIVE BULLET ───────────── */
                '--slider-pagination-active-bullet-bg':
                  paginationActiveBulletBackgroundColor || '#007aff',
                '--slider-pagination-active-bullet-size': `${
                  paginationActiveBulletSize || paginationBulletsSize || 21
                }px`,

                '--slider-pagination-active-bullet-border': `${
                  paginationActiveBulletBorder || paginationBulletsBorder
                }px`,
                '--slider-pagination-active-bullet-border-radius': `${
                  paginationActiveBulletBorderRadius ||
                  paginationBulletsBorderRadius ||
                  0
                }px`,
                '--slider-pagination-active-bullet-border-color':
                  paginationActiveBulletBorderColor ||
                  paginationBulletsBorderColor ||
                  '#ffffff',
              } as React.CSSProperties
            }
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              Parallax,
              Thumbs,
              Keyboard,
              Mousewheel,
              ...effectModules,
            ]}
            keyboard={{
              enabled: keyboard,
            }}
            mousewheel={mousewheel}
            autoplay={
              autoplay || isPlaying
                ? {
                    delay: slideDelay,
                    stopOnLastSlide: false,
                  }
                : false
            }
            slidesPerView={1}
            spaceBetween={0}
            parallax={true}
            thumbs={{swiper: thumbsSwiper}}
            pagination={
              pagination
                ? paginationBulletsImage
                  ? {
                      clickable: true,
                      dynamicBullets: paginationDynamicBullets,
                      renderBullet: (index: any, className: any) => {
                        const src = images[index]?.original?.url;
                        return `
              <span class="${className} slider__pagination-bullet">
                <img src="${src}" alt="" />
              </span>
            `;
                      },
                    }
                  : {
                      clickable: true,
                      dynamicBullets: paginationDynamicBullets,
                    }
                : false
            }
            effect={effect as any}
            {...effectOptions}
            className={clsx(
              'slider__main-swiper',
              pagination &&
                !paginationDynamicBullets &&
                `slider__pagination--${paginationPosition}`
            )}
            loop={isInfinite}
            direction={direction || 'vertical'}
            speed={slideDuration}
          >
            {images.map((image: IImageDTO, index) => (
              <SwiperSlide
                key={image.id ?? index}
                onClick={() => onClick?.(index)}
              >
                {/* ABOVE */}
                {hasTextAbove && (
                  <SlideText ref={textRef} image={image} settings={settings!} />
                )}

                <SliderSlideContent
                  image={image}
                  effect={effect}
                  settings={settings!}
                  textRef={textRef}
                />

                {/* BELOW */}
                {hasTextBelow && (
                  <SlideText ref={textRef} image={image} settings={settings!} />
                )}
              </SwiperSlide>
            ))}
            {navigationButton && !navigationPosition.includes('out') && (
              <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
            )}
            {isSliderAllowed && (
              <IconButton
                className="slider__play-pause"
                onClick={isPlaying ? handlePause : handlePlay}
                aria-label={isPlaying ? 'pause' : 'play'}
                size="large"
              >
                {isPlaying ? (
                  <PauseIcon fontSize="inherit" />
                ) : (
                  <PlayArrowIcon fontSize="inherit" />
                )}
              </IconButton>
            )}
          </Swiper>
          {navigationButton && navigationPosition.includes('out-bottom') && (
            <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
          )}
        </div>
        {/* THUMBNAILS (SEPARATE COMPONENT) */}

        {hasThumbs && (
          <SliderThumbs
            key={`thumbs-${staticKey}`}
            images={images}
            direction={thumbsVertical ? 'vertical' : 'horizontal'}
            settings={settings!}
            setThumbsSwiper={setThumbsSwiper}
          />
        )}
      </div>
    </Box>
  );
};

export {Slider};
export default Slider;
