import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {ImageType} from 'data-structures';
import React from 'react';
import {Watermark} from 'utils/renderWatermark';

const BlogImage = ({
  image,
  index,
  containerInnerWidth,
  imageWidth,
  imageWidthType,
  imageHeight,
  imageHeightType,
  imageRadius,
  hoverEffect,
  onClick,
  showVideoCover,
}: any) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const settings: any = {
    containerInnerWidth,
    imageWidth,
    imageWidthType,
    imageHeight,
    imageHeightType,
    imageRadius,
    hoverEffect,
    showVideoCover,
  };

  return (
    <div
      ref={wrapperRef}
      onClick={() => onClick?.(index)}
      className={clsx(
        'blog-gallery__image-container',
        'photo-album-item__image-wrapper_' + hoverEffect,
        !!onClick
          ? 'blog-gallery__image_clickable'
          : 'blog-gallery__image_non_clickable'
      )}
      style={{
        width: `${
          containerInnerWidth >= 1 && containerInnerWidth <= 720
            ? '100%'
            : `${imageWidth}${imageWidthType}`
        }`,
        borderRadius: `${imageRadius}%`,
        height: `${imageHeight}${imageHeightType}`,
      }}
    >
      {image.type === ImageType.IMAGE && (
        <ReImage
          wrapperRef={wrapperRef}
          src={image.thumbnail.url}
          srcSet={`${image.thumbnail.url} ${image.thumbnail.width}w, 
                  ${image.medium_large.url} ${image.medium_large.width}w, 
                  ${image.large.url} ${image.large.width}w, 
                  ${image.original.url} ${image.original.width}w`}
          sizes={`${containerInnerWidth}px`}
          alt={image.alt}
        />
      )}
      {image.type === ImageType.VIDEO && (
        <ReVideo
          wrapperRef={wrapperRef}
          item={image}
          settings={settings}
          coverImageProps={{
            src: image.thumbnail.url,
            srcSet: `${image.thumbnail.url} ${image.thumbnail.width}w, 
                  ${image.medium_large.url} ${image.medium_large.width}w, 
                  ${image.large.url} ${image.large.width}w`,
            alt: image.alt,
            loading: 'eager',
            sizes: `${containerInnerWidth}px`,
          }}
        />
      )}
      <Watermark />
    </div>
  );
};

export default BlogImage;
