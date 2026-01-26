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

import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';

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
    descriptionFontSize,
    captionFontSize,
    titleFontSize,
    descriptionMaxRowsCount,
    showTitle,
    showDescription,
    showCaption,
    navigationButton,
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

  const mainSwiperRef = useRef<SwiperRef | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [textHeight, setTextHeight] = useState<number>(0);
  const thumbsVertical = isThumbnailsVertical(thumbnailsPosition);
  const {
    effect,
    modules: effectModules,
    effectOptions,
  } = getSwiperEffectOptions(imageAnimation, direction);
  const hasThumbs = hasThumbnails(thumbnailsPosition);

  useEffect(() => {
    if (!textRef.current) return;

    const update = () => {
      setTextHeight(textRef.current!.offsetHeight);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(textRef.current);

    return () => ro.disconnect();
  }, [
    showTitle,
    showDescription,
    showCaption,
    descriptionFontSize,
    captionFontSize,
    titleFontSize,
    descriptionMaxRowsCount,
  ]);
  const handlePlay = () => {
    const swiper = mainSwiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = mainSwiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const swiper = mainSwiperRef.current?.swiper;
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
        <Swiper
          key={`main-${staticKey}`}
          ref={mainSwiperRef}
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
              {textPosition === SliderTextPosition.ABOVE && (
                <SlideText ref={textRef} image={image} settings={settings!} />
              )}

              <SliderSlideContent
                image={image}
                effect={effect}
                settings={settings!}
                textRef={textRef}
              />

              {/* BELOW */}
              {textPosition === SliderTextPosition.BELOW && (
                <SlideText ref={textRef} image={image} settings={settings!} />
              )}
            </SwiperSlide>
          ))}
          {navigationButton && <SliderNavigation settings={settings!} />}
          {/* {navigationButton && <SliderNavigation settings={settings!} />} */}
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
