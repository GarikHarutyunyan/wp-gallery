import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReImage from 'core-components/re-image/ReImage';
import {ReactElement, useEffect, VideoHTMLAttributes} from 'react';

interface IReVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  wrapperRef?: any;
  settings?: any;
  item: any;
  coverImageProps?: any;
}

const ReVideo = ({
  wrapperRef,
  item,
  settings,
  coverImageProps,
  ...props
}: IReVideoProps): ReactElement => {
  useEffect(() => {
    const wrapperElement = wrapperRef?.current;

    wrapperElement?.classList.add('re-image__wrapper');
  }, [wrapperRef]);
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
    <video
      src={item.original.url}
      poster={settings.showVideoCover ? item.medium_large.url : undefined}
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
    />
  );
};

export default ReVideo;
