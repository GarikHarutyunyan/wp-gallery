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
  const {images} = useData();
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
    centeredSlides: true,
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
          loop={true}
          backgroundColor={backgroundColor}
          images={images || []}
          autoplay={autoplay}
          delay={slideDuration}
          playAndPauseAllowed={playAndPauseAllowed}
          width={containerWidth}
          height={containerHeight}
          size={Math.max(width, height)}
          imagesCount={imagesCount}
          preLoadCount={4}
          padding={padding}
          scale={scale}
          allowTouchMove={false}
          onClick={onClick}
          slideCalssname={clsx({carousel__slide_clickable: !!onClick})}
        />
      )}
    </Box>
  );
};

export {Carousel};
export default Carousel;
