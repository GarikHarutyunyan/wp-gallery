import {useData} from 'components/data-context/useData';
import {ReacgPhotoAlbum} from 'components/photo-album/PhotoAlbum';
import {useSettings} from 'components/settings';
import {IMosaicSettings} from 'data-structures';
import React from 'react';

interface IMosaicGalleryProps {
  onClick?: (index: number) => void;
}

const MosaicGallery: React.FC<IMosaicGalleryProps> = ({onClick}) => {
  const {mosaicSettings: settings} = useSettings();
  const {images} = useData();
  const {gap, backgroundColor, containerPadding, padding, width, columns} =
    settings as IMosaicSettings;

  return (
    <ReacgPhotoAlbum
      images={images || []}
      layout={'columns'}
      width={width}
      columns={columns}
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
