import {Box} from '@mui/material';
import clsx from 'clsx';
import {useData} from 'components/data-context/useData';
import {IMosaicSettings} from 'components/mosaic-settings';
import {useSettings} from 'components/settings';
import {Direction, IImageDTO, ImageType} from 'data-structures';
import {useMemo} from 'react';
import PhotoAlbum from 'react-photo-album';
import {createIcon} from 'yet-another-react-lightbox';

const VideoThumbnailIcon = createIcon(
  'VideoThumbnail',
  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
);

const getThumbnailIconSize = (width: number, height: number) => {
  const size: number = Math.min(width, height, 55) - 10;

  return size > 0 ? `${size}px` : '0px';
};

interface IMosaicGalleryProps {
  onClick?: (index: number) => void;
}

const MosaicGallery: React.FC<IMosaicGalleryProps> = ({onClick}) => {
  const {mosaicSettings: settings} = useSettings();
  const {images} = useData();
  const {
    direction,
    gap,
    backgroundColor,
    padding,
    paddingColor,
    rowHeight,
    width,
    columns,
  } = settings as IMosaicSettings;

  const photos = useMemo(() => {
    return images!.map((image: IImageDTO, index: number) => {
      const width =
        image.type !== ImageType.VIDEO
          ? image.original.width
          : image.medium_large.width;
      const height =
        image.type !== ImageType.VIDEO
          ? image.original.height
          : image.medium_large.height;
      const src =
        image.type !== ImageType.VIDEO
          ? image.original.url
          : image.medium_large.url;
      const srcSet = [
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

      if (image.type !== ImageType.VIDEO) {
        srcSet.unshift({
          src: image.original.url,
          width: image.original.width,
          height: image.original.height,
        });
      }

      return {
        width,
        height,
        src,
        type: image.type,
        srcSet,
      };
    });
  }, [images]);

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
          imageProps: {style: {objectFit: 'cover'}},
        }}
        onClick={({index}) => onClick!(index)}
        renderPhoto={({photo, layout, wrapperStyle, renderDefaultPhoto}) => (
          <div
            style={{
              position: 'relative',
              background: paddingColor,
              ...wrapperStyle,
            }}
          >
            {renderDefaultPhoto({wrapped: true})}
            {photo.type === ImageType.VIDEO && (
              <VideoThumbnailIcon
                style={{
                  height: getThumbnailIconSize(layout.width, layout.height),
                  width: getThumbnailIconSize(layout.width, layout.height),
                }}
                className={clsx(
                  'yarl__thumbnails_thumbnail_icon',
                  'thumbnail-gallery__video-icon'
                )}
              />
            )}
          </div>
        )}
      />
    </Box>
  );
};

export {MosaicGallery};
