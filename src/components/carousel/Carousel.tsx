import Box from '@mui/material/Box';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectCoverflow, Navigation} from 'swiper/modules';
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
  } = settings as ICarouselSettings;

  const effects = {
    id: 1,
    spaceBetween: spaceBetween,
    slidesPerView: imagesCount,
    centeredSlides: imagesCount > 1,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      depth: 1,
      modifier: 0.1,
      scale: scale,
      slideShadows: false,
      stretch: 0,
    },
    navigation: true,
    modules: [EffectCoverflow, Autoplay, Navigation],
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
  const containerHeight: number = containerWidth / ratio;
  // This ensures that Swiper functions correctly in infinite loop mode when the total number of images is less than the number of visible slides
  const carouselImages =
    images.length < imagesCount + 1 && images.length > 1
      ? [...images, ...images]
      : images;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth || contWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);
  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
        background: backgroundColor,
        padding: `${padding}px`,
        boxSizing: 'border-box',
      }}
    >
      {(images || []).length > 0 && (
        <SwiperGallery
          key={effects.id}
          effects={effects}
          loop={images.length > 1}
          backgroundColor={backgroundColor}
          images={carouselImages}
          autoplay={autoplay}
          delay={slideDuration}
          playAndPauseAllowed={playAndPauseAllowed}
          width={containerWidth}
          height={containerHeight}
          size={Math.max(width, height)}
          imagesCount={imagesCount}
          preLoadCount={Math.ceil(imagesCount / 2)}
          padding={padding}
          scale={scale}
          allowTouchMove={false}
          onClick={onClick}
          slideClassName={clsx({carousel__slide_clickable: !!onClick})}
        />
      )}
    </Box>
  );
};

export {Carousel};
export default Carousel;
