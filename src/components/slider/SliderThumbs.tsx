import {IImageDTO, ISliderSettings} from 'data-structures';
import {ReactElement} from 'react';
import type {Swiper as SwiperType} from 'swiper';
import {FreeMode, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/thumbs';

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
    width,
    widthType,
    height,
    heightType,
    thumbnailGap,
    activeThumbnailGap,
    isInfinite,
  } = settings;

  return (
    <div
      className="slider__thumbs"
      style={
        {
          'width': direction === 'horizontal' ? `${width}${widthType}` : 'auto',
          'height':
            direction === 'vertical'
              ? `calc(${height}${heightType} + ${textHeight}px)`
              : 'auto',
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
            {({isActive}) => (
              <div className="slider__thumb-content">
                <img src={image.original.url} alt="" />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderThumbs;
