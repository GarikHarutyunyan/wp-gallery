import {
  ImgHTMLAttributes,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import './re-image.css';

interface IReImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperRef: any;
}

const ReImage = ({wrapperRef, ...props}: IReImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;

    wrapperElement?.classList.add('re-image__wrapper');
  }, []);

  useEffect(() => {
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
      {!isLoaded && <div className={'re-iamge__placeholder'} />}
      <img
        loading={'eager'}
        {...props}
        className={props.className}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
