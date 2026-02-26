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
    fillContainer,
    aspectRatio,
    width = 1,
    height = 1,
    columns = 1,
    gap,
    backgroundColor,
    containerPadding,
    itemBorder,
    itemBackgroundColor,
    itemBorderRadius,
    padding,
    paddingColor,
    borderRadius,
    showTitle,
    titleSource,
    titlePosition,
    captionPosition,
    titleAlignment,
    captionVisibility,
    titleVisibility,
    titleFontFamily,
    titleColor,
    titleFontSize = 1,
    overlayTextBackground,
    invertTextColor,
    hoverEffect,
    showCaption,
    captionSource,
    captionFontSize,
    captionFontColor,
    showDescription,
    descriptionSource,
    descriptionPosition,
    descriptionFontSize,
    descriptionFontColor,
    descriptionMaxRowsCount,
    showVideoCover,
  } = settings as IThumbnailSettings;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageRatio, setImageRatio] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  // Get the width of the nearest gallery wrapper related to this instance
  const getWrapperWidth = (): number => {
    const el = elementRef?.current as HTMLElement | null;
    // Prefer the closest ancestor with the wrapper class to avoid cross-instance collisions
    const wrapper = el?.closest('.reacg-gallery-wrapper') as HTMLElement | null;
    if (wrapper && wrapper.clientWidth) return wrapper.clientWidth;
    // Fallback to the current element's bounding box if wrapper not found
    return el?.getBoundingClientRect().width || 0;
  };

  useEffect(() => {
    if (fillContainer) {
      setImageRatio(Number(aspectRatio));
      const currentWidth = getWrapperWidth();
      setImageWidth(currentWidth / columns);
      setImageHeight(imageWidth / imageRatio);
    } else {
      setImageRatio(width / height);
      setImageWidth(width);
      setImageHeight(height);
    }
  }, [fillContainer, aspectRatio, columns, height, width]);

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
    if (
      imageWidth <= image.thumbnail.width &&
      imageHeight <= image.thumbnail.height
    ) {
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
          imageWidth * columns +
          (columns - 1) * gap +
          columns * 2 * padding +
          'px',
        margin: '0 auto',
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <div
        ref={elementRef}
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
          {images?.map((image, index) => (
            <ThumbnailImage
              key={image.original.url + index}
              image={image}
              width={getWidth}
              height={getHeight}
              onClick={onImageClick(index)}
              getImageSource={getImageSource}
              showTitle={showTitle}
              titleSource={titleSource}
              titlePosition={titlePosition}
              captionPosition={captionPosition}
              titleAlignment={titleAlignment}
              captionVisibility={captionVisibility}
              titleVisibility={titleVisibility}
              titleFontFamily={titleFontFamily}
              titleColor={titleColor}
              titleFontSize={titleFontSize}
              overlayTextBackground={overlayTextBackground}
              invertTextColor={invertTextColor}
              itemBorder={itemBorder}
              itemBackgroundColor={itemBackgroundColor}
              itemBorderRadius={itemBorderRadius}
              backgroundColor={paddingColor}
              borderRadius={borderRadius}
              margin={padding}
              hoverEffect={hoverEffect}
              showCaption={showCaption}
              captionSource={captionSource}
              captionFontSize={captionFontSize}
              captionFontColor={captionFontColor}
              showDescription={showDescription}
              descriptionSource={descriptionSource}
              descriptionPosition={descriptionPosition}
              descriptionFontSize={descriptionFontSize}
              descriptionFontColor={descriptionFontColor}
              descriptionMaxRowsCount={descriptionMaxRowsCount}
              showVideoCover={showVideoCover}
            />
          )) || []}
        </ImageList>
      </div>
    </div>
  );
};

export {ThumbnailGallery, type IThumbnailGalleryProps};
export default ThumbnailGallery;
