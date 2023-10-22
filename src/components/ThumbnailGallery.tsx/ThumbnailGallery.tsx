import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import {useLightbox} from 'components/lightbox';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';
import {IImageDTO, TitlePosition, TitleVisibility} from 'data-structures';
import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import './thumbnail-gallery.css';

interface IThumbnailGalleryProps {
  images: IImageDTO[];
  settings: IThumbnailSettings;
}

const ThumbnailGallery: React.FC<IThumbnailGalleryProps> = ({
  images,
  settings,
}) => {
  const {setActiveImageIndex} = useLightbox();
  const {
    width,
    height,
    columns,
    showLightbox,
    gap,
    backgroundColor,
    padding,
    paddingColor,
    borderRadius,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontFamilySize,
  } = settings;
  const elementRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const ratio: number = width / height;

  const changeContainerWidth = () => {
    const divElement = elementRef?.current;

    setContainerWidth((divElement as any)?.clientWidth);
  };

  useLayoutEffect(() => {
    changeContainerWidth();
    window.addEventListener('resize', () => changeContainerWidth());
  }, []);

  const getValidColumnsCount = (columns: number): number => {
    if (
      !containerWidth ||
      width * columns + (columns - 1) * gap + columns * 2 * padding <=
        containerWidth
    ) {
      return columns;
    }

    return getValidColumnsCount(columns - 1);
  };

  const validColumnsCount = useMemo(
    () => getValidColumnsCount(columns),
    [width, gap, columns, padding, containerWidth]
  );

  const getWidth = useMemo((): number => {
    if (containerWidth) {
      const gaap =
        (validColumnsCount - 1) * gap + validColumnsCount * 2 * padding;
      const a = containerWidth - gaap;

      return a / validColumnsCount;
    }

    return width;
  }, [containerWidth, width, gap, columns, padding, validColumnsCount]);

  useLayoutEffect(() => {
    changeContainerWidth();
  }, [width, getWidth, gap, columns, padding, validColumnsCount]);

  return (
    <div
      style={{
        width:
          width * columns + (columns - 1) * gap + columns * 2 * padding + 'px',
        margin: '0 auto',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <div
        ref={elementRef as any}
        style={{
          overflow: 'hidden',
          maxWidth: '100%',
          backgroundColor,
        }}
      >
        <ImageList
          cols={validColumnsCount}
          gap={gap}
          style={{margin: '0 auto'}}
        >
          {images.map((image, index) => (
            <div
              onClick={
                showLightbox ? () => setActiveImageIndex(index) : undefined
              }
              style={{
                borderRadius: borderRadius + '%',
                overflow:
                  titlePosition === TitlePosition.BELOW ? 'hidden' : 'unset',
              }}
            >
              <ImageListItem key={image.medium_large.url}>
                <img
                  className={'thumnail-gallery__image'}
                  src={`${image.medium_large.url}`}
                  alt={image.title}
                  loading="lazy"
                  style={{
                    width: getWidth + 'px',
                    height: getWidth * (1 / ratio) + 'px',
                    padding: padding + 'px',
                    background: paddingColor,
                    borderRadius: borderRadius + '%',
                  }}
                />
                <div
                  className={clsx('thumbnail-gallery__title', {
                    'thumbnail-gallery__title_on-hover':
                      titleVisibility === TitleVisibility.ON_HOVER &&
                      titlePosition !== TitlePosition.BELOW,
                    'thumbnail-gallery__title_hidden':
                      titleVisibility === TitleVisibility.NONE,
                  })}
                >
                  <ImageListItemBar
                    style={{textAlign: titleAlignment}}
                    className={clsx({
                      'thumbnail-gallery__title-content_center':
                        titlePosition === TitlePosition.CENTER,
                    })}
                    title={
                      <span
                        style={{
                          color: titleColor,
                          fontFamily: titleFontFamily,
                          fontSize: titleFontFamilySize + 'px',
                        }}
                      >
                        {image.title}
                      </span>
                    }
                    position={
                      titlePosition !== TitlePosition.CENTER
                        ? titlePosition
                        : 'bottom'
                    }
                  />
                </div>
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery, type IThumbnailGalleryProps};
