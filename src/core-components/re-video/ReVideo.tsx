import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReImage from 'core-components/re-image/ReImage';
import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
  VideoHTMLAttributes,
} from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const wrapperElement = wrapperRef?.current;

    wrapperElement?.classList.add('re-image__wrapper');
  }, [wrapperRef]);

  useEffect(() => {
    setIsLoaded(false);
  }, [item?.original?.url]);

  const onLoadedData = (e: SyntheticEvent<HTMLVideoElement>) => {
    props?.onLoadedData?.(e);
    const videoElement = e.currentTarget;

    videoElement.classList.add('re-image_loaded');
    setIsLoaded(true);
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

  return (
    <>
      {!isLoaded && <div className={'re-image__placeholder'} />}
      <video
        src={item.original.url}
        poster={coverImageProps.src}
        {...props}
        className={'gallery__video'}
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
      />
    </>
  );
};

export default ReVideo;
