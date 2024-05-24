import {Box} from '@mui/material';
import {useData} from 'components/data-context/useData';
import {IMosaicSettings} from 'components/mosaic-settings';
import {useSettings} from 'components/settings';
import {Direction, IImageDTO, ImageType} from 'data-structures';
import React, {ReactNode, useCallback, useMemo} from 'react';
import PhotoAlbum from 'react-photo-album';
import {MosaicGalleryItem} from './MosaicGalleryItem';
import './mosaic-gallery.css';

interface IMosaicGalleryProps {
  onClick?: (index: number) => void;
}

const MosaicGallery: React.FC<IMosaicGalleryProps> = ({onClick}) => {
  const {mosaicSettings: settings} = useSettings();
  const {images} = useData();
  const {direction, gap, backgroundColor, padding, rowHeight, width, columns} =
    settings as IMosaicSettings;

  const photos = useMemo(() => {
    return images!.map((image: IImageDTO, index: number) => {
      const isVideo: boolean = image.type === ImageType.VIDEO;
      const width = isVideo ? image.medium_large.width : image.original.width;
      const height = isVideo
        ? image.medium_large.height
        : image.original.height;
      const src = isVideo ? image.medium_large.url : image.original.url;
      const srcSet = [
        {
          src: image.medium_large.url,
          width: image.medium_large.width,
          height: image.medium_large.height,
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
      };
    });
  }, [images]);

  const onImageClick = useCallback(
    (index: number) => (onClick ? () => onClick(index) : undefined),
    [onClick]
  );

  const renderMosaicGalleryItem = useCallback(
    ({photo, layout, wrapperStyle, renderDefaultPhoto}: any): ReactNode => {
      const image = images?.find((image) => image.id === photo.id) as IImageDTO;
      const index = images?.findIndex(
        (image) => image.id === photo.id
      ) as number;

      return image ? (
        <MosaicGalleryItem
          image={image}
          width={layout.width}
          height={layout.height}
          style={wrapperStyle}
          key={image.original.url}
          onClick={onImageClick(index)}
        >
          {renderDefaultPhoto({wrapped: true})}
        </MosaicGalleryItem>
      ) : null;
    },
    [images, onImageClick]
  );

  return (
    <Box sx={{width: `${width}%`, mx: 'auto'}}>
      <PhotoAlbum
        layout={direction === Direction.VERTICAL ? 'columns' : 'rows'}
        columns={columns}
        spacing={gap}
        padding={padding}
        targetRowHeight={rowHeight}
        photos={photos}
        componentsProps={{
          containerProps: {style: {background: backgroundColor}},
        }}
        renderPhoto={renderMosaicGalleryItem}
      />
    </Box>
  );
};

export {MosaicGallery};
