import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Box} from '@mui/material';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {Button} from 'core-components/button';
import {IBlogSettings} from 'data-structures';
import '../photo-album/photo-album.css';
import './BlogGallery.css';
interface IBlogGalleryProps {
  onClick?: (index: number) => void;
}
const BlogGallery: React.FC<IBlogGalleryProps> = ({onClick}) => {
  const [containerInnerWidth, setContainerInnerWidth] = useState<number>(0);
  const {blogSettings: settings, wrapperRef} = useSettings();
  const {images} = useData();
  const {
    imageWidth,
    imageHeight,
    spacing,
    imageHeightType,
    imageWidthType,
    showTitle,
    showDescription,
    showButton,
    backgroundColor,
    containerPadding,
    imageRadius,
    textVerticalAlignment,
    textHorizontalSpacing,
    textVerticalSpacing,
    titleAlignment,
    titleFontSize,
    titleColor,
    descriptionColor,
    descriptionFontSize,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonFontSize,
    buttonTextColor,
    textFontFamily,
    hoverEffect,
    openInNewTab,
    descriptionMaxRowsCount,
    imagePosition,
  } = settings as IBlogSettings;

  const onCustomActionToggle = (url: string) => {
    if (!!url) {
      if (openInNewTab) {
        window?.open(url, '_blank')?.focus();
      } else {
        window?.open(url, '_self');
      }
    }
  };

  const updateContainerWidth = useCallback(() => {
    if (wrapperRef.current) {
      setContainerInnerWidth(wrapperRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => updateContainerWidth());

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
      updateContainerWidth();
    }

    return () => observer.disconnect();
  }, [updateContainerWidth]);

  const galleryRowClass = useMemo(
    () =>
      `blog-gallery__row${
        containerInnerWidth <= 720 ? ' blog-gallery__row_mobile' : ''
      }`,
    [containerInnerWidth]
  );

  return (
    <Box>
      <div
        style={{
          fontFamily: textFontFamily,
          backgroundColor: backgroundColor,
          gap: spacing,
        }}
        className="blog-gallery"
      >
        {images!.map((image, index) => {
          return (
            <div
              key={image.original.url}
              className={clsx(
                galleryRowClass,
                containerInnerWidth > 720 &&
                  (imagePosition === 'right'
                    ? `${galleryRowClass}_right`
                    : imagePosition === 'left'
                    ? `${galleryRowClass}_left`
                    : imagePosition === 'listed'
                    ? `${galleryRowClass}_listed`
                    : '')
              )}
              style={{
                padding: containerPadding,
              }}
            >
              <div
                onClick={() => onClick?.(index)}
                className={`blog-img-conteiner ${
                  !!onClick ? 'blog-image_clickable' : ''
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
                  <video autoPlay muted loop>
                    <source src={image.thumbnail.url} type="video/mp4" />
                    <source src={image.medium_large.url} type="video/mp4" />
                    <source src={image.large.url} type="video/mp4" />
                    <source src={image.original.url} type="video/mp4" />
                  </video>
                ) : (
                  <img
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
              <div
                className="blog-text-conteiner"
                style={{
                  display: 'flex',
                  alignItems: textVerticalAlignment,
                  padding: `${textVerticalSpacing}px ${textHorizontalSpacing}px`,
                }}
              >
                <div className="blog-text-conteiner__content">
                  {showTitle && image.title && (
                    <h1
                      style={{
                        fontSize: titleFontSize,
                        color: titleColor,
                        textAlign: titleAlignment,
                        margin: 0,
                        padding:
                          showButton && (!showDescription || !image.description)
                            ? '0px 0px 15px'
                            : 0,
                      }}
                    >
                      {image.title}
                    </h1>
                  )}
                  {showDescription && image.description && (
                    <p
                      className="blog-text-conteiner__content__description"
                      style={{
                        WebkitLineClamp: descriptionMaxRowsCount,
                        fontSize: descriptionFontSize,
                        color: descriptionColor,
                      }}
                    >
                      {image.description}
                    </p>
                  )}
                  {showButton && (
                    <Button
                      onClick={() =>
                        onCustomActionToggle(image.action_url || '')
                      }
                      className={'blog-button'}
                      style={{
                        display: 'block',
                        backgroundColor: buttonColor,
                        color: buttonTextColor,
                        fontSize: buttonFontSize,
                        textTransform: 'none',
                        marginLeft:
                          buttonAlignment === 'center'
                            ? 'auto'
                            : buttonAlignment === 'right'
                            ? 'auto'
                            : '0',
                        marginRight:
                          buttonAlignment === 'center'
                            ? 'auto'
                            : buttonAlignment === 'left'
                            ? 'auto'
                            : '0',
                      }}
                    >
                      {buttonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};
export {BlogGallery};
export default BlogGallery;
