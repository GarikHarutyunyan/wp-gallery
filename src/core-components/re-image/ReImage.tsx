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
  originalWidth: number;
  originalHeight: number;
}

const getOrientation = (
  width: number,
  height: number
): 'portrait' | 'landscape' => {
  return height > width ? 'portrait' : 'landscape';
};

const ReImage = ({
  wrapperRef,
  originalWidth,
  originalHeight,
  ...props
}: IReImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orientation, setOrientation] = useState(
    getOrientation(originalWidth, originalHeight)
  );
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setOrientation(getOrientation(originalWidth, originalHeight));
  }, [originalWidth, originalHeight]);

  useEffect(() => {
    const imageElement = imageRef.current;

    // Handle cached/already-complete images that may not trigger onLoad again.
    if (imageElement?.complete && imageElement.naturalWidth > 0) {
      imageElement.classList.add('re-image_loaded');
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [props.src, originalWidth, originalHeight]);

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;

    img.classList.add('re-image_loaded');
    setIsLoaded(true);
  };

  const imageStyle = {
    '--re-image-original-width': `${originalWidth}px`,
    '--re-image-original-height': `${originalHeight}px`,
    ...props.style,
  } as CSSProperties;
  const imageClassName = clsx('re-image', props.className, {
    're-image_portrait': orientation === 'portrait',
    're-image_landscape': orientation === 'landscape',
  });

  return (
    <>
      {!isLoaded && <div className={'re-image__placeholder'} />}
      <img
        ref={imageRef}
        loading={'eager'}
        {...props}
        className={imageClassName}
        style={imageStyle}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
