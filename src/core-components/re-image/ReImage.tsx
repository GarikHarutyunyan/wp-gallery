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

    wrapperElement?.classList.add('re-image__wrapper');
  }, []);

  const onLoad = (e: SyntheticEvent) => {
    props?.onLoad?.(e as any);
    const img = e.currentTarget;
    const wrapper = wrapperRef.current;

    img.classList.add('re-image_loaded');

    wrapper?.querySelector('.re-iamge__placeholder')?.remove();
  };

  return (
    <>
      <div className={'re-iamge__placeholder'} />
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
