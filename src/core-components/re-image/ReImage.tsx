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
    wrapperElement?.classList.add('re-image__wrapper_withoutStyles');
    wrapperElement?.classList.add('re-image__wrapper');
  }, []);

  const onLoad = (e: SyntheticEvent) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;
    const wrapper = wrapperRef.current;
    img.classList.add('re-image_loaded');
    setTimeout(() => {
      wrapper?.classList.remove('re-image__wrapper_withoutStyles');
      wrapper?.querySelector('.re-image__placeholder')?.remove();
    }, 1200);
  };

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

  return (
    <>
      <div className={'re-image__placeholder'} />

      {!isLoaded && <div className={'re-image__placeholder'} />}

      <img
        ref={imageRef}
        loading={'eager'}
        {...props}
        className={`re-image_loading ${props.className ?? ''}`}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
