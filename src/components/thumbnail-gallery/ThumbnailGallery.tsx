import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import {IThumbnailSettings} from 'components/thumbnail-settings/ThumbnailSettings';
import {
  IImageDTO,
  ImageType,
  TitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import './thumbnail-gallery.css';
import {createIcon} from 'yet-another-react-lightbox';

interface IThumbnailGalleryProps {
  images: IImageDTO[];
  settings: IThumbnailSettings;
  onClick?: (index: number) => void;
}

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

const ThumbnailGallery: React.FC<IThumbnailGalleryProps> = ({
  images,
  settings,
  onClick,
}) => {
  const {
    width = 1,
    height = 1,
    columns = 1,
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
    titleFontSize = 1,
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

  const getWidth = useMemo<number>(() => {
    if (containerWidth) {
      const busyWidth =
        validColumnsCount * 2 * padding + (validColumnsCount - 1) * gap;
      const freeWidth = containerWidth - busyWidth;

      return freeWidth / validColumnsCount;
    }

    return width;
  }, [containerWidth, width, gap, columns, padding, validColumnsCount]);

  const getHeight = useMemo<number>(() => {
    return getWidth * (1 / ratio);
  }, [getWidth, ratio]);

  useLayoutEffect(() => {
    changeContainerWidth();
  }, [width, getWidth, gap, columns, padding, validColumnsCount]);

  const getImageSource = (image: IImageDTO) => {
    if (width <= image.thumbnail.width && height <= image.thumbnail.height) {
      return `${image.thumbnail.url}`;
    }
    if (
      width <= image.medium_large.width &&
      height <= image.medium_large.height
    ) {
      return `${image.medium_large.url}`;
    }

    return `${image.original.url}`;
  };

  const videoThumbnailIconSize = useMemo<string>(() => {
    const size: number = Math.min(getWidth, getHeight, 55) - 10;

    return size > 0 ? `${size}px` : '0px';
  }, [getWidth, getHeight]);

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
              onClick={() => onClick?.(index)}
              style={{
                borderRadius: borderRadius + '%',
                overflow:
                  titlePosition === TitlePosition.BELOW ? 'hidden' : 'unset',
              }}
              key={image.original.url + index}
            >
              <ImageListItem key={image.thumbnail.url}>
                <img
                  className={clsx('thumnail-gallery__image', {
                    'thumnail-gallery__image_clickable': !!onClick,
                  })}
                  src={getImageSource(image)}
                  alt={image.title}
                  loading="lazy"
                  style={{
                    width: getWidth + 'px',
                    height: getHeight + 'px',
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
                {image.type === ImageType.VIDEO && (
                  <VideoThumbnailIcon
                    style={{
                      height: videoThumbnailIconSize,
                      width: videoThumbnailIconSize,
                    }}
                    className={'yarl__thumbnails_thumbnail_icon'}
                  />
                )}
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery, type IThumbnailGalleryProps};
