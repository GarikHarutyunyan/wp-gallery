import clsx from 'clsx';
import {
  CSSProperties,
  ImgHTMLAttributes,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import './re-image.css';

interface IReImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperRef: any;
  originalWidth?: number;
  originalHeight?: number;
  cropPosition?: string;
  loadedEffect?: string;
}

const ReImage = ({
  wrapperRef,
  originalWidth,
  originalHeight,
  cropPosition,
  loadedEffect = 'none',
  ...props
}: IReImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    // Handle cached/already-complete images that may not trigger onLoad again.
    if (imageElement?.complete && imageElement.naturalWidth > 0) {
      imageElement.classList.add('re-image_loaded');
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
  }, [props.src, originalWidth, originalHeight, loadedEffect]);

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

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;

    img.classList.add('re-image_loaded');
    setIsLoaded(true);
    if (loadedEffect && loadedEffect !== 'none') {
      setIsAnimationRunning(true);
    } else {
      setIsAnimationRunning(false);
    }
  };

  const onAnimationEnd = (e: SyntheticEvent<HTMLImageElement>) => {
    props?.onAnimationEnd?.(e as any);
    setIsAnimationRunning(false);
  };

  const imageStyle = {
    '--re-image-original-width': originalWidth
      ? `${originalWidth}px`
      : undefined,
    '--re-image-original-height': originalHeight
      ? `${originalHeight}px`
      : undefined,
    ...props.style,
    objectPosition: cropPosition || undefined,
  } as CSSProperties;

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
      <img
        ref={imageRef}
        loading={'eager'}
        {...props}
        className={clsx(
          're-image',
          props.className,
          isLoaded && 're-image_loaded',
          hasActiveEffect && `re-image_effect-${loadedEffect}`
        )}
        style={imageStyle}
        onLoad={onLoad}
        onAnimationEnd={onAnimationEnd}
      />
    </>
  );
};

export default ReImage;
