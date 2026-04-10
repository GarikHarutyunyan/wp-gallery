import {Box} from '@mui/material';
import {
  IImageDTO,
  IMasonrySettings,
  WithStyleAndClassName,
} from 'data-structures';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PhotoAlbum, {LayoutType} from 'react-photo-album';
import {getLargestSrcItem, getSrcSet, ISrcSetItem} from 'utils/imageSrcSet';
import {PhotoAlbumItem} from './PhotoAlbumItem';

const initialContainerWidth = 1000; // Approximate container initial width in pxs.

interface IPhotoAlbumProps extends WithStyleAndClassName {
  images: IImageDTO[];
  width: number;
  layout: LayoutType;
  columns?: number;
  gap: number;
  padding: number;
  rowHeight?: number;
  backgroundColor: string;
  containerPadding: number;
  settings: IMasonrySettings;
  onClick?: (index: number) => void;
}

const ReacgPhotoAlbum: React.FC<IPhotoAlbumProps> = ({
  images,
  width,
  layout,
  columns,
  gap,
  padding,
  rowHeight,
  backgroundColor,
  containerPadding,
  settings,
  onClick,
}) => {
  const [galleryWidth, setGalleryWidth] = useState(initialContainerWidth);
  const initialColumnsCount = columns || 4;

  const photos = useMemo(() => {
    return images?.map((image: IImageDTO) => {
      const srcSet: ISrcSetItem[] = getSrcSet(image.sizes);
      const largestSrcItem: ISrcSetItem = getLargestSrcItem(image.sizes);

      return {
        key: image.id,
        src: largestSrcItem.src,
        width: largestSrcItem.width,
        height: largestSrcItem.height,
        srcSet,
        id: image.id,
        alt: image.alt,
      };
    });
  }, [images]);

  const onImageClick = useCallback(
    (index: number) => (onClick ? () => onClick(index) : undefined),
    [onClick]
  );

  const renderPhoto = useCallback(
    ({photo, layout, wrapperStyle, imageProps}: any): ReactNode => {
      const image = images?.find((image) => image.id === photo.id) as IImageDTO;
      const index = images?.findIndex(
        (image) => image.id === photo.id
      ) as number;

      return image ? (
        <PhotoAlbumItem
          image={image}
          imageProps={imageProps}
          width={layout.width}
          height={layout.height}
          style={wrapperStyle}
          key={image.original.url}
          onClick={onImageClick(index)}
          settings={settings}
        />
      ) : null;
    },
    [images, onImageClick, settings]
  );

  const getColumnsCount = useCallback(
    (containerWidth: number): number => {
      setGalleryWidth(containerWidth);
      for (let column = 1; column <= initialColumnsCount; column++) {
        if (
          containerWidth <=
          (column * initialContainerWidth) / initialColumnsCount
        ) {
          return column;
        }
      }
      return initialColumnsCount;
    },
    [initialColumnsCount]
  );

  // Ensure parent flex lines compute correct height by syncing wrapper minHeight
  const wrapperBoxRef = useRef<HTMLDivElement | null>(null);
  const albumRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const albumEl = albumRootRef.current;
    const boxEl = wrapperBoxRef.current;
    if (!albumEl || !boxEl || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      const h = albumEl.offsetHeight;
      // Only set when we have a non-zero height to avoid layout thrash
      if (h > 0) boxEl.style.minHeight = h + 'px';
    });
    ro.observe(albumEl);
    return () => ro.disconnect();
  }, []);

  return (
    <Box sx={{width: `${width}%`, mx: 'auto'}} ref={wrapperBoxRef}>
      <div ref={albumRootRef} style={{width: '100%'}}>
        <PhotoAlbum
          layout={layout}
          columns={getColumnsCount}
          spacing={gap}
          padding={padding}
          targetRowHeight={rowHeight}
          photos={photos}
          componentsProps={(containerWidth) => ({
            containerProps: {
              style: {
                background: backgroundColor,
                padding: containerPadding + 'px',
              },
            },
            imageProps: {
              loading: (containerWidth || 0) > 500 ? 'eager' : 'lazy',
            },
          })}
          renderPhoto={renderPhoto}
          sizes={{
            size: galleryWidth + 'px',
          }}
        />
      </div>
    </Box>
  );
};

export {ReacgPhotoAlbum};
