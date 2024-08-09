import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {IImageDTO, ImageType} from 'data-structures';
import useConfigureSwiper from 'hooks/useConfigureSwiper';
import React, {useEffect, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import './swiper-gallery.css';
interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor: string;
  loop: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  playAndPouseAllowed?: boolean;
  className?: string;
  width?: number;
  height?: number;
  imagesCount?: number;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
  loop,
  effects,
  autoplay,
  delay,
  className,
  playAndPouseAllowed,
  width,
  height,
  imagesCount,
}) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef<boolean>(false);
  const key = effects.effect + 'Effect';
  const previusIndex = useRef<number>(-1);

  useConfigureSwiper(swiperRef, key);
  const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        (1 - progress).toString()
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper?.autoplay) {
      swiper.autoplay.stop();
    }
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (autoplay && swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
    if (!autoplay && swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }

    if (!autoplay) {
      swiper.autoplay.stop();
    }
  }, [autoplay, playAndPouseAllowed]);

  const handlePlay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  const onMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const onMouseMove = () => {
    if (isDragging.current && videoRef.current) {
      (videoRef.current as HTMLVideoElement).controls = false;
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).controls = true;
    }
  };

  const handleThumbnailClick = (index: number) => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.realIndex;

    const backwardLoadStartIndex = activeIndex
      ? Math.max(
          activeIndex - (imagesCount !== undefined ? imagesCount : 0) - 4,
          0
        )
      : 0;
    const backwardLoadEndIndex = activeIndex;
    if (activeIndex > previusIndex.current && previusIndex.current !== -1) {
      const loadStartIndex = activeIndex;
      const loadEndIndex = Math.min(
        imagesCount + activeIndex + 4,
        images.length
      );

      for (let i = loadStartIndex; i <= loadEndIndex; i++) {
        const imgElement = document.querySelector(
          `.lazy[data-index="${i}"]`
        ) as HTMLImageElement;

        if (imgElement && (!imgElement.src || imgElement.src === undefined)) {
          imgElement.setAttribute('src', images[i].original.url);
          imgElement.setAttribute(
            'srcSet',
            `${images[i].thumbnail.url} ${images[i].thumbnail.width}w, ${images[i].medium_large.url} ${images[i].medium_large.width}w, ${images[i].original.url} ${images[i].original.width}w`
          );
        }
      }
    } else if (previusIndex.current !== -1) {
      for (let i = backwardLoadStartIndex; i <= backwardLoadEndIndex; i++) {
        const imgElement = document.querySelector(
          `.lazy[data-index="${i}"]`
        ) as HTMLImageElement;

        if (imgElement && (!imgElement.src || imgElement.src === undefined)) {
          imgElement.setAttribute('src', images[i].original.url);
          imgElement.setAttribute(
            'srcSet',
            `${images[i].thumbnail.url} ${images[i].thumbnail.width}w, ${images[i].medium_large.url} ${images[i].medium_large.width}w, ${images[i].original.url} ${images[i].original.width}w`
          );
        }
      }
    }

    previusIndex.current = activeIndex;
  };

  return (
    <Swiper
      ref={swiperRef}
      autoplay={{delay, stopOnLastSlide: true, pauseOnMouseEnter: true}}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      grabCursor={true}
      loop={loop}
      pagination={false}
      slidesPerView={1}
      className={className}
      onSlideChange={key === 'coverflowEffect' && handleSlideChange}
      {...effects}
      style={
        key === 'cardsEffect' || key === 'flipEffect' || key === 'cubeEffect'
          ? {
              width,
              height,
            }
          : {}
      }
    >
      {images?.map((image: IImageDTO, index) => {
        const isVideo: boolean = image.type === ImageType.VIDEO;
        const visible = document.querySelector('.swiper-slide-visible');

        return (
          <SwiperSlide onClick={() => handleThumbnailClick(index)}>
            {image.id}
            {!isVideo ? (
              <img
                data-index={index}
                src={
                  index < 4 || index >= images.length - 5
                    ? image.original.url
                    : undefined
                }
                className="lazy"
                alt={image.title}
                style={{
                  background: key !== 'coverflow' ? backgroundColor : '',
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={image.original.url}
                poster={image.medium_large.url}
                style={{
                  background: backgroundColor,
                }}
                className={'swiper-gallery__video'}
                controls
                // draggable={true}
                onMouseDown={onMouseDown}
              />
            )}
          </SwiperSlide>
        );
      })}
      {(autoplay || isPlaying) && playAndPouseAllowed && (
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      )}
      {playAndPouseAllowed && (
        <IconButton
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
  );
};

export {SwiperGallery};

// const handleSlideChange = () => {
//   const swiper = swiperRef.current?.swiper;
//   const activeIndex = swiper.realIndex;
//   const totalSlides = images.length;
//   const imagesToLoad = 4; // Number of images to preload before/after the active index

//   const loadImagesInRange = (startIndex: number, endIndex: number) => {
//     for (let i = startIndex; i <= endIndex; i++) {
//       const normalizedIndex = (i + totalSlides) % totalSlides;
//       const imgElement = document.querySelector(
//         `.lazy[data-index="${normalizedIndex}"]`
//       ) as HTMLImageElement;

//       if (imgElement && (!imgElement.src || imgElement.src === undefined)) {
//         const image = images[normalizedIndex];
//         imgElement.setAttribute('src', image.original.url);
//         imgElement.setAttribute(
//           'srcSet',
//           `${image.thumbnail.url} ${image.thumbnail.width}w, ${image.medium_large.url} ${image.medium_large.width}w, ${image.original.url} ${image.original.width}w`
//         );
//       }
//     }
//   };

//   if (activeIndex > previusIndex.current && previusIndex.current !== -1) {
//     // Moving forward
//     const loadStartIndex = activeIndex;
//     const loadEndIndex = Math.min(activeIndex + imagesToLoad, totalSlides - 1);
//     loadImagesInRange(loadStartIndex, loadEndIndex);
//   } else if (previusIndex.current !== -1) {
//     // Moving backward
//     const loadStartIndex = Math.max(activeIndex - imagesToLoad, 0);
//     const loadEndIndex = activeIndex;
//     loadImagesInRange(loadStartIndex, loadEndIndex);
//   }

//   previusIndex.current = activeIndex;
// };
