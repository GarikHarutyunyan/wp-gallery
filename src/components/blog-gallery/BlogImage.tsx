import clsx from 'clsx';
import ReImage from 'core-components/re-image/ReImage';
import ReVideo from 'core-components/re-video/ReVideo';
import {ImageType, SizeTypeWidth} from 'data-structures';
import React from 'react';
import {
  getLargestSrcItem,
  getSrcSetString,
  ISrcSetItem,
} from 'utils/imageSrcSet';
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
  const isMobile = containerInnerWidth >= 1 && containerInnerWidth <= 720;
  const imageWidthStyle = isMobile ? '100%' : `${imageWidth}${imageWidthType}`;

  const isPercentWidth = imageWidthType === SizeTypeWidth.PERCENT;
  const containerWidthPx = `${containerInnerWidth}px`;
  const computedImageWidth = isPercentWidth
    ? `${(containerInnerWidth * imageWidth) / 100}px`
    : `${imageWidth}${imageWidthType}`;

  const imageSizes = isMobile ? containerWidthPx : computedImageWidth;

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
  const srcSetString: string = getSrcSetString(image.sizes);
  const largestSrcItem: ISrcSetItem = getLargestSrcItem(image.sizes);

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
        width: imageWidthStyle,
        borderRadius: `${imageRadius}%`,
        height: `${imageHeight}${imageHeightType}`,
      }}
    >
      {image.type === ImageType.IMAGE && (
        <ReImage
          wrapperRef={wrapperRef}
          src={largestSrcItem.src}
          srcSet={srcSetString}
          sizes={imageSizes}
          alt={image.alt}
        />
      )}
      {image.type === ImageType.VIDEO && (
        <ReVideo
          wrapperRef={wrapperRef}
          item={image}
          settings={settings}
          coverImageProps={{
            src: largestSrcItem.src,
            srcSet: srcSetString,
            alt: image.alt,
            loading: 'eager',
            sizes: imageSizes,
          }}
        />
      )}
      <Watermark />
    </div>
  );
};

export default BlogImage;
