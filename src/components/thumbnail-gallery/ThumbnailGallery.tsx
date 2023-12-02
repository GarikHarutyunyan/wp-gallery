import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import {useLightbox} from 'components/lightbox';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';
import {IImageDTO, TitlePosition, TitleVisibility} from 'data-structures';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
    width = 0,
    height = 0,
    columns = 0,
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
    titleFontSize,
  } = settings;
  const elementRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const ratio: number = width / height;

  const changeContainerWidth = () => {
    const divElement = elementRef?.current;

    setContainerWidth((divElement as any)?.clientWidth);
  };

  useEffect(() => {
    changeContainerWidth();
    window.addEventListener('resize', () => changeContainerWidth());
  }, []);

  const getValidColumnsCount = (): number => {
    const containerBox: number = +width + 2 * padding;

    if (!containerWidth || !containerBox) {
      return columns;
    }

    let validColumns = Math.floor(containerWidth / containerBox) + 1;

    while (
      (validColumns - 1) * containerBox + (validColumns - 2) * gap >
        containerWidth ||
      validColumns > columns
    ) {
      validColumns--;
    }

    return validColumns;
  };

  const validColumnsCount = useMemo(getValidColumnsCount, [
    width,
    gap,
    columns,
    padding,
    containerWidth,
  ]);

  const getWidth = useMemo((): number => {
    if (containerWidth) {
      const busyWidth =
        validColumnsCount * 2 * padding + (validColumnsCount - 1) * gap;
      const freeWidth = containerWidth - busyWidth;

      return freeWidth / validColumnsCount;
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
          gap={+gap}
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
              key={image.original.url + index}
            >
              <ImageListItem key={image.medium_large.url}>
                <img
                  className={clsx('thumnail-gallery__image', {
                    'thumnail-gallery__image_clickable': showLightbox,
                  })}
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
                          fontSize: titleFontSize + 'px',
                        }}
                      >
                        {image.title || <br />}
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
