import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from 'react';
import {getMedianSrcItem, ISrcSetItem} from 'utils/imageSrcSet';

interface IReVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  wrapperRef?: any;
  settings?: any;
  item: any;
  coverImageProps: any;
}

const ReVideo = ({
  wrapperRef,
  item,
  settings,
  coverImageProps,
  ...props
}: IReVideoProps): ReactElement => {
  const loadedEffect =
    settings?.loadedEffect || coverImageProps?.loadedEffect || 'none';
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && videoElement.readyState >= 2) {
      videoElement.classList.add('re-image_loaded');
      setIsLoaded(true);
      if (loadedEffect && loadedEffect !== 'none') {
        setIsAnimationRunning(true);
      } else {
        setIsAnimationRunning(false);
      }
      return;
    }

    setIsLoaded(false);
    setIsAnimationRunning(Boolean(loadedEffect && loadedEffect !== 'none'));
  }, [item?.original?.url, loadedEffect]);

  useEffect(() => {
    if (isLoaded && loadedEffect && loadedEffect !== 'none') {
      setIsAnimationRunning(true);
    } else {
      setIsAnimationRunning(false);
    }
  }, [loadedEffect, isLoaded]);

  useEffect(() => {
    if (isLoaded && isAnimationRunning) {
      const timer = setTimeout(() => {
        setIsAnimationRunning(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isAnimationRunning]);

  const onLoadedData = (e: SyntheticEvent<HTMLVideoElement>) => {
    props?.onLoadedData?.(e);
    const videoElement = e.currentTarget;

    videoElement.classList.add('re-image_loaded');
    setIsLoaded(true);
    if (loadedEffect && loadedEffect !== 'none') {
      setIsAnimationRunning(true);
    } else {
      setIsAnimationRunning(false);
    }
  };

  const onAnimationEnd = (e: SyntheticEvent<HTMLVideoElement>) => {
    props?.onAnimationEnd?.(e as any);
    setIsAnimationRunning(false);
  };

  if (settings.showVideoCover) {
    return (
      <>
        <ReImage wrapperRef={wrapperRef} {...coverImageProps} />
        <PlayArrowIcon
          className={'gallery__video-icon'}
          style={{
            fontSize: '60px',
          }}
        />
      </>
    );
  }

  const medianSrcItem: ISrcSetItem = getMedianSrcItem(item.sizes);
  const poster: string = medianSrcItem.src;
  const showPlaceholder = !isLoaded || isAnimationRunning;
  const hasActiveEffect =
    isLoaded &&
    isAnimationRunning &&
    Boolean(loadedEffect && loadedEffect !== 'none');

  return (
    <>
      {showPlaceholder && (
        <div
          className={clsx(
            're-image__placeholder',
            isLoaded && 're-image__placeholder_animating'
          )}
        />
      )}
      <video
        ref={videoRef}
        src={item.original.url}
        poster={poster}
        {...props}
        className={clsx(
          'gallery__video',
          props.className,
          isLoaded && 're-image_loaded',
          hasActiveEffect && `re-image_effect-${loadedEffect}`
        )}
        style={{
          ...props.style,
          objectPosition: item?.crop_position || 'center center',
        }}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        controls={
          typeof settings.showVideoControls === 'boolean'
            ? settings.showVideoControls
            : false
        }
        onLoadedData={onLoadedData}
        onAnimationEnd={onAnimationEnd}
      />
    </>
  );
};

export default ReVideo;
