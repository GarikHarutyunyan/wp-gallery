import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import {SwiperGallery} from '../SwiperGallery';
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
    isInfinite,
    autoplay,
    slideDuration,
    playAndPouseAllowed,
    width,
    height,
    imagesCount,
    spaceBetween,
  } = settings as ICarouselSettings;

  const effects = {
    id: 1,
    spaceBetween: spaceBetween,
    slidesPerView: imagesCount,
    centeredSlides: true,
    effect: 'coverflow',
    loopedSlides: 8,
    coverflowEffect: {
      rotate: 0,
      depth: 1,
      modifier: 0.1,
      scale: 1.2,
      slideShadows: true,
      stretch: 0,
    },
    navigation: true,
    // preloadImages: false,
    // lazy: {
    //   loadOnTransitionStart: false,
    //   loadPrevNext: true,
    // },

    // watchSlidesProgress: true,
    // watchSlidesVisibility: true,

    modules: [EffectCoverflow, Pagination, Autoplay, Navigation, Thumbs],
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

  const handleSlideChange = (previusIndex: any, swiperRef: any) => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.realIndex;
    const loadImagesInRange = (startIndex: number, endIndex: number) => {
      for (let i = startIndex; i <= endIndex; i++) {
        const imgElement = document.querySelector(
          `.lazy[data-index="${i}"]`
        ) as HTMLImageElement;

        if (
          imgElement &&
          images &&
          (!imgElement.src || imgElement.src === undefined)
        ) {
          imgElement.setAttribute('src', images[i].original.url);
          imgElement.setAttribute(
            'srcSet',
            `${images[i].thumbnail.url} ${images[i].thumbnail.width}w, ${images[i].medium_large.url} ${images[i].medium_large.width}w, ${images[i].original.url} ${images[i].original.width}w`
          );
        }
      }
    };

    if (
      activeIndex > previusIndex.current &&
      previusIndex.current !== -1 &&
      images
    ) {
      const loadStartIndex = activeIndex;
      const loadEndIndex = Math.min(
        imagesCount + activeIndex + 4,
        images.length
      );
      loadImagesInRange(loadStartIndex, loadEndIndex);
    } else if (previusIndex.current !== -1) {
      const loadStartIndex = activeIndex
        ? Math.max(
            activeIndex - (imagesCount !== undefined ? imagesCount : 0) - 4,
            0
          )
        : 0;
      const loadEndIndex = activeIndex;
      loadImagesInRange(loadStartIndex, loadEndIndex);
    }
    previusIndex.current = activeIndex;
  };

  const handleThumbnailClick = (index: number, swiperRef: any) => {
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
        background: backgroundColor,
        padding: `${padding}px`,
      }}
    >
      <SwiperGallery
        key={effects.id}
        effects={effects}
        loop={isInfinite}
        backgroundColor={backgroundColor}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
        playAndPouseAllowed={playAndPouseAllowed}
        width={containerWidth}
        height={containerHeight}
        imagesCount={imagesCount}
        handleSlideChange={handleSlideChange}
        handleThumbnailClick={handleThumbnailClick}
      />
    </Box>
  );
};

export {Carousel};