import {
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
}

const ReImage = ({wrapperRef, ...props}: IReImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;

    wrapperElement?.classList.add('re-image__wrapper');
  }, []);

  useEffect(() => {
    const imageElement = imageRef.current;

    // Handle cached/already-complete images that may not trigger onLoad again.
    if (imageElement?.complete && imageElement.naturalWidth > 0) {
      imageElement.classList.add('re-image_loaded');
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [props.src]);

  const onLoad = (e: SyntheticEvent) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;

    img.classList.add('re-image_loaded');
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <div className={'re-image__placeholder'} />}
      <img
        ref={imageRef}
        loading={'eager'}
        {...props}
        className={props.className}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
