import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {Button} from 'core-components/button';
import {IStaggeredSettings} from 'data-structures';
import './StaggeredGallery.css';
interface IStaggeredGalleryProps {
  onClick?: (index: number) => void;
}
const StaggeredGallery: React.FC<IStaggeredGalleryProps> = ({onClick}) => {
  const [containerInnerWidth, setContainerInnerWidth] = useState<number>(0);
  const {staggeredSettings: settings, wrapperRef} = useSettings();
  const {images} = useData();
  const {
    titleColor,
    descriptionColor,
    titleFontFamily,
    titleFontSize,
    descriptionFontSize,
    buttonColor,
    buttonTextColor,
    backgroundColor,
    sizeType,
    width,
    height,
    showButton,
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
        containerInnerWidth ? 'staggered-gallery-row--mobile' : ''
      }`,
    [containerInnerWidth]
  );

  return (
    <Box>
      <div
        style={{fontFamily: titleFontFamily, backgroundColor: backgroundColor}}
        className="staggered-gallery"
      >
        {images!.map((image, index) => {
          return (
            <div className={galleryRowClass}>
              <div
                onClick={() => onClick?.(index)}
                className={`straggered-img-conteiner ${
                  !!onClick ? 'straggered-image_clickable' : ''
                }`}
                style={{
                  width: `${containerInnerWidth <= 720 ? 100 : width}%`,
                  height: `${height}${sizeType}`,
                }}
              >
                <img src={image.thumbnail.url} alt={image.title} />
              </div>
              <div className="staggered-text-conteiner">
                <div className="staggered-text-conteiner-content">
                  <h1 style={{fontSize: titleFontSize, color: titleColor}}>
                    {image.title}
                  </h1>
                  <p
                    style={{
                      fontSize: descriptionFontSize,
                      color: descriptionColor,
                    }}
                  >
                    {image.description}
                  </p>
                  {showButton && (
                    <Button
                      onClick={() =>
                        onCustomActionToggle(image.action_url || '')
                      }
                      className={'pagination-provider__load-more-button'}
                      style={{
                        backgroundColor: buttonColor,
                        color: buttonTextColor,
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
