import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {
  IImageDTO,
  ISliderSettings,
  SliderSlidesDesign,
  SliderTextPosition,
} from 'data-structures';
import {useEffect, useRef, useState} from 'react';
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
    padding,
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
    direction,
    slidesDesign,
    backgroundBlur,
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
  console.log(textHeight);
  useEffect(() => {
    console.log(textRef.current);
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
    setThumbsSwiper(null);
  }, [
    images,
    direction,
    isInfinite,
    imageAnimation,
    hasThumbs,
    keyboard,
    mousewheel,
  ]);

  return (
    <Box className="slider">
      {/* Inner Box (flex container for slider + thumbnails) */}
      <div
        className="slider__layout"
        style={{
          flexDirection: getThumbnailsFlexDirection(thumbnailsPosition),
          gap: thumbnailPadding,
          backgroundColor: backgroundColor || 'transparent',
        }}
      >
        <Swiper
          key={`main-${direction}-${isInfinite}-${hasThumbs}-${imageAnimation}-${keyboard}-${mousewheel}`}
          ref={mainSwiperRef}
          style={
            {
              width,
              height: direction === 'vertical' ? height + textHeight : '',
              // '--swiper-navigation-top-offset': 'calc(50% - 49px)',
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
          navigation={navigationButton}
          thumbs={{swiper: thumbsSwiper}}
          pagination={
            pagination ? {clickable: true, dynamicBullets: true} : false
          }
          effect={effect as any}
          {...effectOptions}
          className="slider__main-swiper"
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
              <div
                className="slider__slide-content"
                style={{
                  backgroundColor:
                    (slidesDesign === SliderSlidesDesign.FIT ||
                      slidesDesign === SliderSlidesDesign.BLURFIT) &&
                    effect === 'creative'
                      ? backgroundColor
                      : '',
                  padding: padding,
                  height, // only the inner content gets padding
                }}
              >
                {slidesDesign === SliderSlidesDesign.BLURFIT && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0, // full size
                      backgroundImage: `url(${image.original.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      filter: `blur(${backgroundBlur}px)`, // blur only background
                      transform: 'scale(1.1)', // avoid edges showing
                      zIndex: 0,
                    }}
                  />
                )}
                <img
                  src={image.original.url}
                  alt=""
                  style={{
                    width:
                      slidesDesign === SliderSlidesDesign.FILL
                        ? '100%'
                        : 'auto',
                    height:
                      slidesDesign === SliderSlidesDesign.FILL
                        ? '100%'
                        : 'auto',
                    objectFit:
                      slidesDesign === SliderSlidesDesign.FILL
                        ? 'cover'
                        : 'contain',
                    zIndex: 1,
                  }}
                />

                {(showTitle || showCaption || showDescription) &&
                  textPosition !== SliderTextPosition.ABOVE &&
                  textPosition !== SliderTextPosition.BELOW && (
                    <SlideText
                      ref={textRef}
                      image={image}
                      settings={settings!}
                    />
                  )}
              </div>
              {/* BELOW */}
              {textPosition === SliderTextPosition.BELOW && (
                <SlideText ref={textRef} image={image} settings={settings!} />
              )}
            </SwiperSlide>
          ))}
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
            key={`thumbs-${direction}-${isInfinite}-${hasThumbs}-${imageAnimation}-${keyboard}-${mousewheel}`}
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
