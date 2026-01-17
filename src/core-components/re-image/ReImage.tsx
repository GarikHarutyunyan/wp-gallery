import {
  ImgHTMLAttributes,
  ReactElement,
  SyntheticEvent,
  useEffect,
} from 'react';
import './re-image.css';

interface IReImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperRef: any;
}

const ReImage = ({wrapperRef, ...props}: IReImageProps): ReactElement => {
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

  return (
    <>
      <div className={'re-image__placeholder'} />
      <img
        loading={'eager'}
        {...props}
        className={`re-image_loading ${props.className ?? ''}`}
        onLoad={onLoad}
      />
    </>
  );
};

export default ReImage;
