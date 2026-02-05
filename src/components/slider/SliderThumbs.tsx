import {IImageDTO, ISliderSettings, SliderTextPosition} from 'data-structures';
import {ReactElement} from 'react';
import type {Swiper as SwiperType} from 'swiper';
import {FreeMode, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/thumbs';
import {SlideText} from './SlideText';

interface ISliderThumbsProps {
  images: IImageDTO[];
  direction: 'horizontal' | 'vertical';
  settings: ISliderSettings;
  setThumbsSwiper: (swiper: SwiperType) => void;
  textHeight?: number;
}

const SliderThumbs = ({
  images,
  settings,
  direction,
  setThumbsSwiper,
  textHeight,
}: ISliderThumbsProps): ReactElement => {
  const {
    thumbnailsAlignment,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorderRadius,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailPadding,
    thumbnailBackgroundColor,
    thumbnailOpacity,
    activeThumbnailWidth,
    activeThumbnailHeight,
    activeThumbnailPadding,
    activeThumbnailOpacity,
    activeThumbnailBorder,
    activeThumbnailBackgroundColor,
    activeThumbnailBorderColor,
    activeThumbnailBorderRadius,
    thumbnailBarBackgroundColor,
    thumbnailBarOpacity,
    thumbnailBarPadding,
    thumbnailBarBorder,
    thumbnailBarBorderColor,
    thumbnailBarBorderRadius,
    height,
    heightType,
    thumbnailGap,
    activeThumbnailGap,
    thumbnailShowTitle,
    thumbnailShowCaption,
    thumbnailShowDescription,
    thumbnailTextPosition,
  } = settings;
  const hasTextAbove =
    (thumbnailShowTitle || thumbnailShowDescription || thumbnailShowCaption) &&
    thumbnailTextPosition === SliderTextPosition.ABOVE;

  const hasTextBelow =
    (thumbnailShowTitle || thumbnailShowDescription || thumbnailShowCaption) &&
    thumbnailTextPosition === SliderTextPosition.BELOW;
  const showTextAbsalute =
    (thumbnailShowTitle || thumbnailShowDescription || thumbnailShowCaption) &&
    thumbnailTextPosition !== SliderTextPosition.ABOVE &&
    thumbnailTextPosition !== SliderTextPosition.BELOW;
  return (
    <div
      className="slider__thumbs"
      style={
        {
          'width': direction === 'horizontal' ? '100%' : 'auto',
          'height':
            direction === 'vertical'
              ? `calc(${height}${heightType} + ${textHeight}px)`
              : 'auto',
          '--slider-thumbs-align': thumbnailsAlignment || 'center',
          '--slider-thumbs-bar-bg': thumbnailBarBackgroundColor,
          '--slider-thumbs-bar-opacity': thumbnailBarOpacity,
          '--slider-thumbs-bar-padding': `${thumbnailBarPadding}px`,
          '--slider-thumbs-bar-border': `${thumbnailBarBorder}px solid ${thumbnailBarBorderColor}`,
          '--slider-thumbs-bar-radius': `${thumbnailBarBorderRadius}px`,
        } as React.CSSProperties
      }
    >
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={'auto'}
        modules={[Thumbs, FreeMode]}
        className="slider__thumbs-swiper"
        direction={direction}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.8,
          momentumBounce: false,
        }}
        resistanceRatio={0}
        touchReleaseOnEdges={false}
        watchSlidesProgress={true}
        slideToClickedSlide={false}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id ?? index}
            className="slider__thumb"
            style={
              {
                '--slider-thumb-width': `${thumbnailWidth}px`,
                '--slider-thumb-height': `${thumbnailHeight}px`,
                '--slider-thumb-padding': `${thumbnailPadding}px`,
                '--slider-thumb-radius': `${thumbnailBorderRadius}px`,
                '--slider-thumb-border': `${thumbnailBorder}px solid ${thumbnailBorderColor}`,
                '--slider-thumb-bg': thumbnailBackgroundColor,
                '--slider-thumb-opacity': thumbnailOpacity,
                '--slider-thumb-margin': `${thumbnailGap}px`,

                '--slider-thumb-active-width': `${activeThumbnailWidth}px`,
                '--slider-thumb-active-height': `${activeThumbnailHeight}px`,
                '--slider-thumb-active-padding': `${activeThumbnailPadding}px`,
                '--slider-thumb-active-radius': `${activeThumbnailBorderRadius}px`,
                '--slider-thumb-active-border': `${activeThumbnailBorder}px solid ${activeThumbnailBorderColor}`,
                '--slider-thumb-active-bg': activeThumbnailBackgroundColor,
                '--slider-thumb-active-opacity': activeThumbnailOpacity,
                '--slider-thumb-active-margin': `${activeThumbnailGap}px`,
              } as React.CSSProperties
            }
          >
            {hasTextAbove && (
              <SlideText image={image} settings={settings!} variant={'thumb'} />
            )}
            <div className="slider__thumb-content">
              <img src={image.original.url} alt="" />
              {showTextAbsalute && (
                <SlideText
                  image={image}
                  settings={settings!}
                  variant={'thumb'}
                />
              )}
            </div>
            {hasTextBelow && (
              <SlideText image={image} settings={settings!} variant={'thumb'} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderThumbs;
