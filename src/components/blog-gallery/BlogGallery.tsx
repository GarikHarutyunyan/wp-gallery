import React, {useCallback, useEffect, useState} from 'react';

import {Box} from '@mui/material';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {Button} from 'core-components/button';
import {IBlogSettings} from 'data-structures';
import '../photo-album/photo-album.css';
import './BlogGallery.css';
import BlogImage from './BlogImage';
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
  const isMobile: boolean = containerInnerWidth <= 720;

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

  return (
    <Box>
      <div
        style={{
          fontFamily: textFontFamily,
          backgroundColor: backgroundColor,
          gap: spacing,
          padding: containerPadding,
        }}
        className="blog-gallery"
      >
        {images!.map((image, index) => {
          return (
            <div
              key={image.original.url}
              className={clsx('blog-gallery__row', {
                'blog-gallery__row_mobile': isMobile,
                'blog-gallery__row_right':
                  !isMobile && imagePosition === 'right',
                'blog-gallery__row_left': !isMobile && imagePosition === 'left',
                'blog-gallery__row_listed':
                  !isMobile && imagePosition === 'listed',
              })}
            >
              <BlogImage
                image={image}
                index={index}
                containerInnerWidth={containerInnerWidth}
                imageWidth={imageWidth}
                imageWidthType={imageWidthType}
                imageHeight={imageHeight}
                imageHeightType={imageHeightType}
                imageRadius={imageRadius}
                hoverEffect={hoverEffect}
                onClick={onClick}
              />
              <div
                className="blog-gallery__text-container"
                style={{
                  display: 'flex',
                  alignItems: textVerticalAlignment,
                  padding: `${textVerticalSpacing}px ${textHorizontalSpacing}px`,
                }}
              >
                <div className="blog-gallery__text-container-content">
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
                      className="blog-gallery__text-container-content-description"
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
                      className={'blog-gallery__button'}
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
