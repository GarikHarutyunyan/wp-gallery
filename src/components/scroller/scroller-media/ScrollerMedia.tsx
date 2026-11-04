import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {ImageType} from 'data-structures';
import React from 'react';
import {getSrcSetString} from 'utils/imageSrcSet';
import {IScrollerItem} from '../ScrollerItem';
import './scroller-media.css';

interface IScrollerMediaProps {
  item: IScrollerItem;
  showVideoCover: boolean;
  size: number;
  wrapperRef: React.RefObject<HTMLDivElement>;
  loadedEffect?: string;
}

const ScrollerMedia = ({
  item,
  showVideoCover,
  size,
  wrapperRef,
  loadedEffect,
}: IScrollerMediaProps) => {
  const srcSetString = getSrcSetString(item.image.sizes);

  if (item.image.type === ImageType.VIDEO) {
    return (
      <ReVideo
        wrapperRef={wrapperRef}
        item={item.image}
        settings={{showVideoCover, showVideoControls: false}}
        coverImageProps={{
          src: item.src,
          srcSet: srcSetString,
          sizes: `${size}px`,
          alt: item.image.alt || item.image.title,
          loading: 'eager',
          className: 'reacg-scroller-media',
          originalWidth: item.image.original.width,
          originalHeight: item.image.original.height,
          cropPosition: item.image.crop_position,
          loadedEffect,
        }}
        className="reacg-scroller-media"
      />
    );
  }

  return (
    <ReImage
      wrapperRef={wrapperRef}
      src={item.src}
      srcSet={srcSetString}
      sizes={`${size}px`}
      alt={item.image.alt || item.image.title}
      loading="eager"
      className="reacg-scroller-media"
      originalWidth={item.image.original.width}
      originalHeight={item.image.original.height}
      cropPosition={item.image.crop_position}
      loadedEffect={loadedEffect}
    />
  );
};

export {ScrollerMedia};
