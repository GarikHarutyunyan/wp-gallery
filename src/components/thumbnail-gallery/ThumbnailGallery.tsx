import ImageList from '@mui/material/ImageList';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {useAppInfo} from 'contexts';
import {IImageDTO, IThumbnailSettings, ImageType} from 'data-structures';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './thumbnail-gallery.css';
import ThumbnailImage from './ThumbnailImage';

interface IThumbnailGalleryProps {
  onClick?: (index: number) => void;
}

const ThumbnailGallery: React.FC<IThumbnailGalleryProps> = ({onClick}) => {
  const {galleryId} = useAppInfo();
  const {thumbnailSettings: settings} = useSettings();
  const {images} = useData();
  const {
    fullWidth,
    ratio,
    width = 1,
    height = 1,
    columns = 1,
    gap,
    backgroundColor,
    containerPadding,
    padding,
    paddingColor,
    borderRadius,
    titleSource,
    titlePosition,
    titleAlignment,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize = 1,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor
  } = settings as IThumbnailSettings;
  const elementRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageRatio, setImageRatio] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if ( fullWidth ) {
      setImageRatio(Number(ratio));
      setImageWidth((elementRef?.current as any)?.getBoundingClientRect().width / columns);
      setImageHeight(imageWidth / imageRatio);
    }
    else {
      setImageRatio(width / height);
      setImageWidth(width);
      setImageHeight(height);
    }
  }, [fullWidth, ratio, imageWidth, columns, height, width, imageRatio, setImageRatio, setImageHeight, setImageWidth]);

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
    const containerBox: number = +imageWidth + 2 * padding;

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
    imageWidth,
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

    return imageWidth;
  }, [
    containerWidth,
    containerPadding,
    imageWidth,
    gap,
    padding,
    validColumnsCount,
  ]);

  const getHeight = useMemo<number>(() => {
    return getWidth * (1 / imageRatio);
  }, [getWidth, imageRatio]);

  useLayoutEffect(() => {
    changeContainerWidth();
  }, [imageWidth, getWidth, gap, columns, padding, validColumnsCount]);

  const getImageSource = (image: IImageDTO) => {
    if (imageWidth <= image.thumbnail.width && imageHeight <= image.thumbnail.height) {
      return `${image.thumbnail.url}`;
    }
    if (
        imageWidth <= image.medium_large.width &&
        imageHeight <= image.medium_large.height
    ) {
      return `${image.medium_large.url}`;
    }

    if (
      (imageWidth <= image.large.width && imageHeight <= image.large.height) ||
      image.type === ImageType.VIDEO
    ) {
      return `${image.large.url}`;
    }

    return `${image.original.url}`;
  };

  const listRef = useRef<HTMLUListElement | null>(null);
  const onImageClick = useCallback(
      (index: number) => (onClick ? () => onClick(index) : undefined),
      [onClick]
  );

  return (
    <div
      style={{
        width:
            imageWidth * columns + (columns - 1) * gap + columns * 2 * padding + 'px',
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
          ref={listRef}
        >
          {images!.map((image, index) => (
            <ThumbnailImage
              key={image.original.url + index}
              image={image}
              width={getWidth}
              height={getHeight}
              onClick={onImageClick(index)}
              getImageSource={getImageSource}
              titleSource={titleSource}
              titlePosition={titlePosition}
              titleAlignment={titleAlignment}
              titleVisibility={titleVisibility}
              titleFontFamily={titleFontFamily}
              titleColor={titleColor}
              titleFontSize={titleFontSize}
              backgroundColor={paddingColor}
              borderRadius={borderRadius}
              margin={padding}
              hoverEffect={hoverEffect}
              showCaption={showCaption}
              captionSource={captionSource}
              captionFontSize={captionFontSize}
              captionFontColor={captionFontColor}
            />
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery, type IThumbnailGalleryProps};
export default ThumbnailGallery;
