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
    sizeType,
    showTitle,
    showDescription,
    showButton,
    backgroundColor,
    containerPadding,
    gap,
    borderRadius,
    textsAlignment,
    paddingLeftRight,
    paddingTopBottom,
    titleAlignment,
    titleFontFamily,
    titleFontSize,
    titleColor,
    descriptionColor,
    descriptionFontSize,
    buttonAlignment,
    buttonColor,
    buttonTextColor,
    hoverEffect,
    openButtonUrlInNewTab,
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
      `staggered-gallery-row ${
        containerInnerWidth <= 720 ? 'staggered-gallery-row--mobile' : ''
      }`,
    [containerInnerWidth]
  );

  return (
    <Box>
      <div
        style={{
          fontFamily: titleFontFamily,
          backgroundColor: backgroundColor,
          gap: gap,
        }}
        className="staggered-gallery"
      >
        {images!.map((image, index) => {
          return (
            <div
              className={galleryRowClass}
              style={{
                height: `${height}${sizeType}`,
                padding: containerPadding,
              }}
            >
              <div
                onClick={() => onClick?.(index)}
                className={`straggered-img-conteiner ${
                  !!onClick ? 'straggered-image_clickable' : ''
                }photo-album-item__image-wrapper_${hoverEffect}`}
                style={{
                  width: `${containerInnerWidth <= 720 ? 100 : width}%`,
                  borderRadius: `${borderRadius}%`,
                }}
              >
                <img src={image.thumbnail.url} alt={image.title} />
              </div>
              <div
                className="staggered-text-conteiner"
                style={{
                  display: 'flex',
                  alignItems: textsAlignment,
                  padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
                }}
              >
                <div className="staggered-text-conteiner-content">
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
                  {showDescription && (
                    <p
                      style={{
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
                      {`see more`}
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
