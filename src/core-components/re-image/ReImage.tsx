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

const getOrientation = (
  width?: number,
  height?: number
): 'portrait' | 'landscape' | undefined => {
  if (!width || !height) return undefined;

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
    const wrapperElement = wrapperRef.current;

    wrapperElement?.classList.add('re-image__wrapper');
  }, [wrapperRef]);

  useEffect(() => {
    setOrientation(getOrientation(originalWidth, originalHeight));
  }, [originalWidth, originalHeight]);

  useEffect(() => {
    const imageElement = imageRef.current;

    // Handle cached/already-complete images that may not trigger onLoad again.
    if (imageElement?.complete && imageElement.naturalWidth > 0) {
      imageElement.classList.add('re-image_loaded');
      setOrientation(
        getOrientation(
          originalWidth || imageElement.naturalWidth,
          originalHeight || imageElement.naturalHeight
        )
      );
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [props.src, originalWidth, originalHeight]);

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;

    img.classList.add('re-image_loaded');
    setOrientation(
      getOrientation(
        originalWidth || img.naturalWidth,
        originalHeight || img.naturalHeight
      )
    );
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
  const imageClassName = [
    props.className,
    orientation ? `re-image_${orientation}` : undefined,
  ]
    .filter(Boolean)
    .join(' ');

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
