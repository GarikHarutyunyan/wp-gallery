import ReImage from 'core-components/re-image/ReImage';
import React from 'react';

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
}: any) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      onClick={() => onClick?.(index)}
      className={`blog-gallery__image-container ${
        !!onClick ? 'blog-gallery__image_clickable' : ''
      } photo-album-item__image-wrapper_${hoverEffect}`}
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
      {image.type === 'video' ? (
        <video autoPlay muted loop playsInline>
          <source src={image.original.url} type="video/mp4" />
        </video>
      ) : (
        <ReImage
          wrapperRef={wrapperRef}
          src={image.thumbnail.url}
          srcSet={`${image.thumbnail.url} ${image.thumbnail.width}w, 
                  ${image.medium_large.url} ${image.medium_large.width}w, 
                  ${image.large.url} ${image.large.width}w, 
                  ${image.original.url} ${image.original.width}w`}
          sizes={`${containerInnerWidth}px`}
          alt={image.title}
        />
      )}
    </div>
  );
};

export default BlogImage;
