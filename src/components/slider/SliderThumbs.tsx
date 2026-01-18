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
}

const SliderThumbs = ({
  images,
  settings,
  direction,
  setThumbsSwiper,
}: ISliderThumbsProps): ReactElement => {
  const {
    thumbnailWidth,
    thumbnailHeight,
    thumbnailBorderRadius,
    thumbnailBorder,
    thumbnailBorderColor,
    thumbnailPadding,
    width,
    height,
    thumbnailGap: gap,
    isInfinite,
  } = settings;

  return (
    <div
      className="slider__thumbs"
      style={{
        width: direction === 'horizontal' ? width : 'auto',
        height: direction === 'vertical' ? height : 'auto',
        padding: thumbnailPadding,
      }}
    >
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={gap}
        slidesPerView={'auto'}
        modules={[Thumbs, FreeMode]}
        freeMode={true}
        className="slider__thumbs-swiper"
        loop={isInfinite}
        direction={direction}
        slideToClickedSlide={true}
        watchSlidesProgress={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id ?? index} className="slider__thumb">
            <div
              className="slider__thumb-content"
              style={{
                width: thumbnailWidth,
                height: thumbnailHeight,
                borderRadius: thumbnailBorderRadius,
                border: `${thumbnailBorder}px solid ${thumbnailBorderColor}`,
              }}
            >
              <img src={image.original.url} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderThumbs;
