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
}

const ReImage = ({
  wrapperRef,
  originalWidth,
  originalHeight,
  ...props
}: IReImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
    '--re-image-original-width': originalWidth
      ? `${originalWidth}px`
      : undefined,
    '--re-image-original-height': originalHeight
      ? `${originalHeight}px`
      : undefined,
    ...props.style,
  } as CSSProperties;

  return (
    <>
      {!isLoaded && <div className={'re-image__placeholder'} />}
      <img
        ref={imageRef}
        loading={'eager'}
        {...props}
        className={clsx('re-image', props.className)}
        style={imageStyle}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
