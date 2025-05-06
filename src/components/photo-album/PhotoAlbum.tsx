import {Box} from '@mui/material';
import {
  IImageDTO,
  IMasonrySettings,
  ImageType,
  WithStyleAndClassName,
} from 'data-structures';
import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import PhotoAlbum, {LayoutType} from 'react-photo-album';
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
    return images!.map((image: IImageDTO) => {
      const isVideo: boolean = image.type === ImageType.VIDEO;
      const width = isVideo ? image.medium_large.width : image.original.width;
      const height = isVideo
        ? image.medium_large.height
        : image.original.height;
      const src = isVideo ? image.medium_large.url : image.original.url;
      const srcSet = [
        {
          src: image.large.url,
          width: image.large.width,
          height: image.large.height,
        },
        {
          src: image.medium_large.url,
          width: image.medium_large.width,
          height: image.medium_large.height,
        },
        {
          src: image.thumbnail.url,
          width: image.thumbnail.width,
          height: image.thumbnail.height,
        },
      ];

      if (!isVideo) {
        srcSet.unshift({
          src: image.original.url,
          width: image.original.width,
          height: image.original.height,
        });
      }

      return {
        key: image.id,
        width,
        height,
        src,
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
    ({photo, layout, wrapperStyle, renderDefaultPhoto}: any): ReactNode => {
      const image = images?.find((image) => image.id === photo.id) as IImageDTO;
      const index = images?.findIndex(
        (image) => image.id === photo.id
      ) as number;

      return image ? (
        <PhotoAlbumItem
          image={image}
          width={layout.width}
          height={layout.height}
          style={wrapperStyle}
          key={image.original.url}
          onClick={onImageClick(index)}
          settings={settings}
        >
          {renderDefaultPhoto({wrapped: true})}
        </PhotoAlbumItem>
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

  return (
    <Box sx={{width: `${width}%`, mx: 'auto'}}>
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
          imageProps: {loading: (containerWidth || 0) > 500 ? 'eager' : 'lazy'},
        })}
        renderPhoto={renderPhoto}
        sizes={{
          size: galleryWidth + 'px',
        }}
      />
    </Box>
  );
};

export {ReacgPhotoAlbum};
