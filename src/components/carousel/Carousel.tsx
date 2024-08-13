import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {ICarouselSettings} from 'data-structures';
import React, {useEffect, useState} from 'react';
import {SwiperGallery} from '../SwiperGallery';
import './carousel.css';
import {useSwiperEffects} from './effects';

type EffectTypes = 'coverflow' | 'cards' | 'creative';

interface ITCarouselProps {
  onClick?: (index: number) => void;
}

const Carousel: React.FC<ITCarouselProps> = ({onClick}) => {
  const {images} = useData();
  const {carouselSettings: settings, wrapperRef} = useSettings();
  const {
    backgroundColor,
    loop,
    effects,
    autoplay,
    delay,
    playAndPouseAllowed,
    width,
    height,
    playActivSlideSizes,
    activeSlideHeight,
    activeSlideWidth,
    imagesCount,
  } = settings as ICarouselSettings;

  const selectedEffect = useSwiperEffects()[effects as EffectTypes];
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth * 0.8 || width
  );
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = containerWidth / ratio;
  const activeSlideRatio: number = width / activeSlideHeight;
  const ativelideHeightResponsive: number = containerWidth / activeSlideRatio;
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth * 0.8 || width);
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
        width:
          selectedEffect.effect === 'coverflow'
            ? `${containerWidth}px`
            : 'auto',
        height:
          selectedEffect.effect === 'coverflow'
            ? `${containerHeight}px`
            : 'auto',
        mx: 'auto',
        background:
          selectedEffect.effect === 'coverflow' ? backgroundColor : '',
      }}
    >
      <SwiperGallery
        key={selectedEffect.id}
        effects={selectedEffect}
        loop={loop}
        backgroundColor={backgroundColor}
        images={images || []}
        autoplay={autoplay}
        delay={delay}
        playAndPouseAllowed={playAndPouseAllowed}
        width={containerWidth}
        height={containerHeight}
        playActivSlideSizes={playActivSlideSizes}
        ativelideHeightResponsive={ativelideHeightResponsive}
        activeSlideWidth={activeSlideWidth}
        imagesCount={imagesCount}
        handleSlideChange={handleSlideChange}
        handleThumbnailClick={handleThumbnailClick}
      />
    </Box>
  );
};

export {Carousel};
