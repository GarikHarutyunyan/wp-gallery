import clsx from 'clsx';
import type {Swiper as SwiperType} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {
  IImageDTO,
  ISliderSettings,
  SliderPaginationType,
} from 'data-structures';
import {useState} from 'react';
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Thumbs,
} from 'swiper/modules';
import {SliderNavigation} from './SliderNavigation';
import {SliderPlayPause} from './SliderPlayPause';
import {SliderSlideContent} from './SliderSlideContent';
import {SlideText} from './SlideText';
import {getLazyLoadNearbySlides} from './utils/getLazyLoadNearbySlides';
import {getPaginationCSSVars} from './utils/getPaginationCSSVars';
import {getSwiperEffectOptions} from './utils/getSwiperEffects';

interface SliderMainProps {
  images: IImageDTO[];
  settings: ISliderSettings;
  thumbsSwiper: SwiperType | null;
  onClick?: (index: number) => void;
  textHeight: number;
  textRef: React.RefObject<HTMLDivElement>;
  mainSwiperRef: React.MutableRefObject<SwiperType | null>;
  hasTextAbove: boolean;
  hasTextBelow: boolean;
  paginationRef: any;
}

const SliderMain: React.FC<SliderMainProps> = ({
  images,
  settings,
  thumbsSwiper,
  onClick,
  textHeight,
  textRef,
  mainSwiperRef,
  hasTextAbove,
  hasTextBelow,
  paginationRef,
}) => {
  const {
    width,
    widthType,
    height,
    heightType,
    pagination,
    paginationPosition,
    paginationType,
    paginationBulletsImage,
    imageAnimation,
    keyboard,
    mousewheel,
    autoplay,
    slideDelay,
    isInfinite,
    direction,
    slideDuration,
    navigationButton,
    navigationPosition,
    isSliderAllowed,
    navigationSize,
    navigationPadding,
  } = settings;
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const {
    effect,
    modules: effectModules,
    effectOptions,
  } = getSwiperEffectOptions(imageAnimation, direction);

  const paginationConfig = pagination
    ? paginationType === SliderPaginationType.FRACTION
      ? {
          type: 'fraction' as const,
        }
      : paginationType === SliderPaginationType.NUMBERS
      ? {
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `
            <span class="${className} slider__pagination-number">
              ${index + 1}
            </span>
          `;
          },
        }
      : paginationBulletsImage
      ? {
          clickable: true,
          dynamicBullets: paginationType === SliderPaginationType.DYNAMIC,
          renderBullet: (index: number, className: string) => {
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
          dynamicBullets: paginationType === SliderPaginationType.DYNAMIC,
        }
    : false;

  const templateSlideWidth =
    (Number(navigationSize) + Number(navigationPadding) * 2) * 2;

  return (
    <Swiper
      className={clsx(
        'slider__main-swiper',
        pagination &&
          paginationType !== SliderPaginationType.DYNAMIC &&
          `slider__pagination--${paginationPosition}`,
        (imageAnimation === 'zoom' || imageAnimation === 'rotate') &&
          'swiper-overflow-visible'
      )}
      style={
        {
          '--slider__template-total': `${templateSlideWidth}px`,
          '--slider__height-without-text-height': `${height}${heightType}`,
          '--slider__height-with-text-height': `calc(${height}${heightType} + ${textHeight}px)`,
          ...getPaginationCSSVars(settings!),
        } as React.CSSProperties
      }
      onSwiper={(swiper: any) => (mainSwiperRef.current = swiper)}
      preventInteractionOnTransition={true}
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
        pagination && paginationPosition.includes('out')
          ? {
              el: '.slider__pagination-external',

              ...paginationConfig,
            }
          : pagination
          ? {
              ...paginationConfig,
            }
          : false
      }
      effect={effect as any}
      {...effectOptions}
      loop={isInfinite}
      direction={direction || 'vertical'}
      speed={slideDuration}
      onSlideChange={(swiper: SwiperType) => {
        getLazyLoadNearbySlides(swiper, images);
      }}
    >
      {images.map((image: IImageDTO, index) => (
        <SwiperSlide key={image.id ?? index} onClick={() => onClick?.(index)}>
          {/* ABOVE */}
          {hasTextAbove && (
            <SlideText
              ref={textRef}
              image={image}
              settings={settings!}
              variant={'main'}
            />
          )}

          <SliderSlideContent
            width={width}
            widthType={widthType}
            prevIndex={images.length - 1}
            index={index}
            image={image}
            effect={effect}
            settings={settings!}
            textRef={textRef}
          />

          {/* BELOW */}
          {hasTextBelow && (
            <SlideText
              ref={textRef}
              image={image}
              settings={settings!}
              variant={'main'}
            />
          )}
        </SwiperSlide>
      ))}
      {navigationButton && !navigationPosition.includes('out') && (
        <SliderNavigation mainRef={mainSwiperRef} settings={settings!} />
      )}

      <SliderPlayPause
        swiperRef={mainSwiperRef}
        autoplay={autoplay}
        isSliderAllowed={isSliderAllowed}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </Swiper>
  );
};

export default SliderMain;
