import {useData} from 'components/data-context/useData';
import {ReacgPhotoAlbum} from 'components/photo-album/PhotoAlbum';
import {useSettings} from 'components/settings';
import {Direction, IMosaicSettings} from 'data-structures';
import React from 'react';
import {LayoutType} from 'react-photo-album';

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
    containerPadding,
    padding,
    rowHeight,
    width,
    columns,
  } = settings as IMosaicSettings;
  const layout: LayoutType =
    direction === Direction.VERTICAL ? 'columns' : 'rows';

  return (
    <ReacgPhotoAlbum
      images={images || []}
      layout={layout}
      width={width}
      columns={columns}
      rowHeight={rowHeight}
      gap={gap}
      padding={padding}
      backgroundColor={backgroundColor}
      containerPadding={containerPadding}
      settings={settings as IMosaicSettings}
      onClick={onClick}
    />
  );
};

export {MosaicGallery};
export default MosaicGallery;
