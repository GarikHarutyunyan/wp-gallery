import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {Button} from 'core-components/button';
import {IStaggeredSettings} from 'data-structures';
import '../photo-album/photo-album.css';
import './StaggeredGallery.css';
interface IStaggeredGalleryProps {
  onClick?: (index: number) => void;
}
const StaggeredGallery: React.FC<IStaggeredGalleryProps> = ({onClick}) => {
  const [containerInnerWidth, setContainerInnerWidth] = useState<number>(0);
  const {staggeredSettings: settings, wrapperRef} = useSettings();
  const {images} = useData();
  const {
    width,
    height,
    gap,
    sizeTypeHeight,
    sizeTypeWidth,
    showTitle,
    showDescription,
    showButton,
    backgroundColor,
    containerPadding,
    borderRadius,
    textsAlignment,
    paddingLeftRight,
    paddingTopBottom,
    titleAlignment,
    titleFontSize,
    titleColor,
    descriptionColor,
    descriptionFontSize,
    buttonText,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    textsFontFamily,
    hoverEffect,
    openButtonUrlInNewTab,
    descriptionMaxRows,
    buttonFontSize,
  } = settings as IStaggeredSettings;

  const onCustomActionToggle = (url: string) => {
    if (!!url) {
      if (openButtonUrlInNewTab) {
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
      `staggered-gallery__row ${
        containerInnerWidth <= 720 ? 'staggered-gallery__row_mobile' : ''
      }`,
    [containerInnerWidth]
  );

  return (
    <Box>
      <div
        style={{
          fontFamily: textsFontFamily,
          backgroundColor: backgroundColor,
          gap: gap,
        }}
        className="staggered-gallery"
      >
        {images!.map((image, index) => {
          return (
            <div
              key={image.original.url}
              className={galleryRowClass}
              style={{
                padding: containerPadding,
              }}
            >
              <div
                onClick={() => onClick?.(index)}
                className={`straggered-img-conteiner ${
                  !!onClick ? 'straggered-image_clickable' : ''
                } photo-album-item__image-wrapper_${hoverEffect}`}
                style={{
                  width: `${
                    containerInnerWidth >= 1 && containerInnerWidth <= 720
                      ? '100%'
                      : `${width}${sizeTypeWidth}`
                  }`,
                  borderRadius: `${borderRadius}%`,
                  height: `${height}${sizeTypeHeight}`,
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
                className="staggered-text-conteiner"
                style={{
                  display: 'flex',
                  alignItems: textsAlignment,
                  padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
                }}
              >
                <div className="staggered-text-conteiner__content">
                  {showTitle && (
                    <h1
                      style={{
                        fontSize: titleFontSize,
                        color: titleColor,
                        textAlign: titleAlignment,
                      }}
                    >
                      {image.title}
                    </h1>
                  )}
                  {showDescription && image.description && (
                    <p
                      className="staggered-text-conteiner__content__description"
                      style={{
                        WebkitLineClamp: descriptionMaxRows,
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
                      className={'staggered-button'}
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
export {StaggeredGallery};
export default StaggeredGallery;
