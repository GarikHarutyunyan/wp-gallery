import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {useAppInfo} from 'contexts';
import {
  IImageDTO,
  IThumbnailSettings,
  ImageType,
  ThumbnailTitlePosition,
  TitleVisibility,
} from 'data-structures';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createIcon} from 'yet-another-react-lightbox';
import './thumbnail-gallery.css';

interface IThumbnailGalleryProps {
  onClick?: (index: number) => void;
}

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

const ThumbnailGallery: React.FC<IThumbnailGalleryProps> = ({onClick}) => {
  const {galleryId} = useAppInfo();
  const {thumbnailSettings: settings} = useSettings();
  const {images} = useData();
  const {
    width = 1,
    height = 1,
    columns = 1,
    gap,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize = 1,
    hoverEffect,
  } = settings as IThumbnailSettings;
  const elementRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const ratio: number = width / height;

  const changeContainerWidth = () => {
    const divElement = elementRef?.current;

    setContainerWidth((divElement as any)?.getBoundingClientRect().width);
  };

  useEffect(() => {
    changeContainerWidth();
    window.addEventListener('resize', () => changeContainerWidth());
  }, []);

  useEffect(() => {
    document
      .getElementById('reacg-root' + galleryId)
      ?.style.setProperty('--reacg-thumbnails-gap', `${gap}px`);
  }, [gap, galleryId]);

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
      const freeWidth = containerWidth - 2 * containerPadding - busyWidth;

      return freeWidth / validColumnsCount;
    }

    return width;
  }, [
    containerWidth,
    containerPadding,
    width,
    gap,
    columns,
    padding,
    validColumnsCount,
  ]);

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

    if (
      (width <= image.large.width && height <= image.large.height) ||
      image.type === ImageType.VIDEO
    ) {
      return `${image.large.url}`;
    }

    return `${image.original.url}`;
  };

  const videoThumbnailIconSize = useMemo<string>(() => {
    const size: number = Math.min(getWidth, getHeight, 55) - 10;

    return size > 0 ? `${size}px` : '0px';
  }, [getWidth, getHeight]);

  const renderTitle = (image: IImageDTO) => {
    let paddingTitle = '0';

    if (titlePosition === ThumbnailTitlePosition.BELOW) {
      paddingTitle = padding + 'px';
    } else if (titlePosition !== ThumbnailTitlePosition.CENTER) {
      paddingTitle = borderRadius / 2 + '%';
    }

    return (
      <div
        className={clsx('thumbnail-gallery__title', {
          'thumbnail-gallery__title_on-hover':
            titleVisibility === TitleVisibility.ON_HOVER &&
            titlePosition !== ThumbnailTitlePosition.BELOW,
          'thumbnail-gallery__title_hidden':
            titleVisibility === TitleVisibility.NONE,
        })}
      >
        <ImageListItemBar
          style={{
            textAlign: titleAlignment,
            paddingLeft: paddingTitle,
            paddingRight: paddingTitle,
            color: titleColor,
          }}
          className={clsx({
            'thumbnail-gallery__title-content_center':
              titlePosition === ThumbnailTitlePosition.CENTER,
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
            titlePosition !== ThumbnailTitlePosition.CENTER
              ? titlePosition
              : 'bottom'
          }
        />
      </div>
    );
  };

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
          padding: containerPadding + 'px',
        }}
      >
        <ImageList
          className={'reacg-thumbnails-wrapper-' + validColumnsCount}
          cols={validColumnsCount}
          gap={+gap}
          style={{margin: '0 auto'}}
        >
          {images!.map((image, index) => (
            <div
              className={'reacg-thumbnails-item'}
              onClick={() => onClick?.(index)}
              style={{
                overflow:
                  titlePosition === ThumbnailTitlePosition.BELOW
                    ? 'hidden'
                    : 'unset',
              }}
              key={image.original.url + index}
            >
              <ImageListItem key={image.thumbnail.url}>
                <div
                  style={{
                    background: paddingColor,
                    borderRadius: borderRadius + '%',
                  }}
                >
                  <div
                    className={clsx(
                      'thumbnail-gallery__image-wrapper',
                      'thumbnail-gallery__image-wrapper_overflow',
                      'thumbnail-gallery__image-wrapper_' + hoverEffect,
                      {'thumbnail-gallery__image-wrapper_clickable': !!onClick}
                    )}
                    style={{
                      width: getWidth + 'px',
                      height: getHeight + 'px',
                      margin: padding + 'px',
                      borderRadius: borderRadius + '%',
                    }}
                  >
                    <img
                      className={clsx(
                        'thumbnail-gallery__image',
                        'MuiImageListItem-img'
                      )}
                      src={getImageSource(image)}
                      alt={image.title}
                      loading="lazy"
                      style={{
                        width: getWidth + 'px',
                        height: getHeight + 'px',
                      }}
                    />
                    {image.type === ImageType.VIDEO && (
                      <VideoThumbnailIcon
                        style={{
                          height: videoThumbnailIconSize,
                          width: videoThumbnailIconSize,
                        }}
                        className={clsx('thumbnail-gallery__video-icon', {
                          'thumbnail-gallery__image-wrapper_clickable': !!onClick,
                        })}
                      />
                    )}
                    {titlePosition !== ThumbnailTitlePosition.BELOW
                      ? renderTitle(image)
                      : null}
                  </div>
                </div>
                {titlePosition === ThumbnailTitlePosition.BELOW
                  ? renderTitle(image)
                  : null}
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery, type IThumbnailGalleryProps};
export default ThumbnailGallery;
